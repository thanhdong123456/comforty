// services/emailService.js
import nodemailer from "nodemailer";
import db from "../config/db.js";

let currentIndex = 0;

export const sendEmailWithPool = async ({ to, subject, text, html }) => {
  const [accounts] = await db.query(
    "SELECT * FROM smtp_accounts WHERE active = 1 ORDER BY id"
  );
  if (!accounts || accounts.length === 0) {
    throw new Error("No active SMTP accounts available");
  }

  const start = currentIndex % accounts.length;
  let lastErr = null;

  for (let offset = 0; offset < accounts.length; offset++) {
    const idx = (start + offset) % accounts.length;
    const account = accounts[idx];

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: account.email,
        pass: account.app_password,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });

    try {
      await transporter.verify();

      const info = await transporter.sendMail({
        from: `"Comforty App" <${account.email}>`,
        to,
        subject,
        text,
        html,
      });

      currentIndex = idx + 1;
      console.log(
        `Email sent to ${to} using ${account.email}: ${info.messageId}`
      );
      return info;
    } catch (err) {
      console.error(
        `SMTP failed for ${account.email}`,
        err && err.code,
        err && err.response
      );
      lastErr = err;

      if (err && err.code === "EAUTH") {
        try {
          await db.query("UPDATE smtp_accounts SET active = 0 WHERE id = ?", [
            account.id,
          ]);
          console.warn(
            `Deactivated smtp account id=${account.id} (${account.email}) due to auth error`
          );
        } catch (updateErr) {
          console.error("Failed to deactivate smtp account in DB", updateErr);
        }
      }
      continue;
    }
  }
  throw lastErr || new Error("All SMTP accounts failed to send email");
};
