// Navigation
export const topBarData = {
  languages: [
    { label: "Eng", value: "en" },
    { label: "Vi", value: "vi" },
  ],
  links: [
    { label: "Faqs", href: "#" },
    { label: "Need Help?", href: "/help", icon: "alert" },
  ],
  navLinks: [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Product", path: "/product" },
    { name: "Pages", path: "/pages" },
    { name: "About", path: "/about" },
  ],
  contactNumber: "(808) 555-0111",
};

// -----------------------------------------------

// HeroSection
export const slides = [
  {
    id: 1,
    subtitle: "WELCOME TO CHAIREY",
    title: "Best Furniture Collection for your interior.",
    image: "/image/Product_image.png",
    imageAlt: "Best Furniture Collection",
    discount: 54,
    buttonText: "Shop Now",
  },
  {
    id: 2,
    subtitle: "MODERN DESIGN",
    title: "Timeless Wooden Collections That Inspire Warmth.",
    image: "/image/Product_01.jpg",
    imageAlt: "Timeless Wooden Collections",
    discount: 40,
    buttonText: "Shop Now",
  },
  {
    id: 3,
    subtitle: "LUXURY COMFORT",
    title: "Minimalist Sofas With Maximum Comfort.",
    image: "/image/Product_02.jpg",
    imageAlt: "Minimalist Sofas",
    discount: 45,
    buttonText: "Shop Now",
  },
];

// - Thêm database list 5 cate : 100%
// - Thêm product cho đủ 20 sản phẩm (thêm id cate của từg sản phẩm để phân loại)
// code màn danh sách sản phẩm (list cate, list sản phẩm) tab bao gồm:
// - UI (destop first)
//         + header, footer tái sử dụng (10 phút)
//         + Tham khảo các template (15 phút)
//         + coding (code UI danh sách sản phẩm) (3 tiếng)
//
// - Responsive giao diện mobile, tablet
//         + coding UI cho mobile, tablet (2 tiếng)
//
// - Kiểm tra kĩ nếu có thiết xót và fix lỗi (2 tiếng)
//
// - Code chức năng
//         + hiển thị danh sách sản phẩm (1 tiếng)
//         + hiển thị danh sách sản phẩm theo cate (1 tiếng)
//         + Điều hướng xem chi tiết sản phẩm (5p)
//         + thêm giỏ hàng (1 tiếng)
//
// Code màn chi tiết sản phẩm
// - UI destop
//         + header, footer (10 phút)
//         + tham khảo các template (15 phút)
//         + coding (code giao diện UI desktop) (3 tiếng)
//         + fix lỗi, bổ sung thêm nếu có thiếu sót (1 tiếng)
// - Responsive mobile, tablet
//         + coding UI cho mobile, tablet (2 tiếng)
// - chức năng
//         + hiển thị thông tin chi tiết sản phẩm (2 tiếng)
//         + thêm sản phẩm vào giỏ hàng từ trang chi tiết (2 tiếng)
//         + test chức năng và fix lỗi nếu có(1 tiếng)

// Tổng cộng: ≈ 24 tiếng rưỡi (≈ 3 ngày làm việc)
// -----------------------------------------------
export const categories = {
  table: { id: 101, name: "Table" },
  chair: { id: 102, name: "Chair" },
  bed: { id: 103, name: "Bed" },
  wardrobe: { id: 104, name: "Wardrobe" },
  shelf: { id: 105, name: "Shelf" },
};

// -----------------------------------------------

// FeatureProduct
export const featuredProducts = {
  items: [
    {
      id: 1,
      categoryId: categories.chair.id,
      name: "Modern Chair",
      price: "$25",
      oldPrice: "$40",
      image: "/image/Product_01.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
      description:
        "Experience ultimate comfort with this modern chair featuring a sleek design, soft cushioned seat, and durable wooden frame. Perfect for living rooms, offices, or reading corners.",
      discount: 38,
      rating: 4.7,
      reviews: 152,
    },
    {
      id: 2,
      categoryId: categories.chair.id,
      name: "Office Chair Pro",
      price: "$35",
      image: "/image/Product_02.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
      description:
        "Ergonomically designed office chair with adjustable height, lumbar support, and smooth-rolling casters. Ideal for long hours of work or study.",
      discount: 0,
      rating: 4.4,
      reviews: 98,
    },
    {
      id: 3,
      categoryId: categories.chair.id,
      name: "Wooden Armchair",
      price: "$30",
      image: "/image/Product_03.jpg",
      description:
        "Classic wooden armchair crafted from high-quality timber. Comfortable, durable, and perfect for adding a natural touch to your living space.",
      discount: 0,
      rating: 4.6,
      reviews: 87,
    },
    {
      id: 4,
      categoryId: categories.chair.id,
      name: "Lounge Chair",
      price: "$45",
      oldPrice: "$60",
      image: "/image/Product_04.jpg",
      description:
        "Relax in style with this lounge chair featuring a soft padded seat and sturdy wooden legs. Perfect for reading, resting, or adding elegance to your room.",
      discount: 25,
      rating: 4.8,
      reviews: 174,
    },
    {
      id: 5,
      categoryId: categories.chair.id,
      name: "Classic Rocking Chair",
      price: "$50",
      image: "/image/Product_05.jpg",
      description:
        "Traditional rocking chair made with premium wood, providing gentle motion for relaxation. Ideal for living rooms or cozy corners.",
      discount: 0,
      rating: 4.3,
      reviews: 65,
    },
    {
      id: 6,
      categoryId: categories.chair.id,
      name: "Minimalist Desk Chair",
      price: "$38",
      oldPrice: "$50",
      image: "/image/Product_06.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
      description:
        "A sleek minimalist desk chair designed for both style and comfort. Lightweight, durable, and perfect for modern workspaces.",
      discount: 24,
      rating: 4.5,
      reviews: 123,
    },
    {
      id: 7,
      categoryId: categories.chair.id,
      name: "Velvet Armchair",
      price: "$70",
      image: "/image/Product_07.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
      description:
        "Luxurious velvet armchair with plush cushioning and elegant design. Perfect to enhance the sophistication of any living room or office.",
      discount: 0,
      rating: 4.9,
      reviews: 201,
    },
    {
      id: 8,
      categoryId: categories.table.id,
      name: "Dining Table Set",
      price: "$120",
      oldPrice: "$150",
      image: "/image/Product_08.jpg",
      description:
        "Modern dining table set with durable tabletop and comfortable chairs. Perfect for family meals, gatherings, or hosting dinner parties.",
      discount: 20,
      rating: 4.6,
      reviews: 133,
    },
    {
      id: 9,
      categoryId: categories.table.id,
      name: "Coffee Table",
      price: "$60",
      oldPrice: "$75",
      image: "/image/Product_09.jpg",
      description:
        "Minimalist coffee table with sleek design and sturdy construction. Ideal for living rooms, lounges, or small spaces.",
      discount: 20,
      rating: 4.4,
      reviews: 94,
    },
    {
      id: 10,
      categoryId: categories.table.id,
      name: "Study Desk",
      price: "$80",
      image: "/image/Product_10.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
      description:
        "Spacious study desk with modern design, perfect for home offices or study rooms. Crafted for comfort and productivity.",
      discount: 0,
      rating: 4.7,
      reviews: 146,
    },
    {
      id: 11,
      categoryId: categories.table.id,
      name: "Round Side Table",
      price: "$45",
      image: "/image/Product_11.jpg",
      description:
        "Elegant round side table, perfect for coffee, books, or decorative items. Compact design suitable for any room.",
      discount: 0,
      rating: 4.3,
      reviews: 72,
    },
    {
      id: 12,
      categoryId: categories.bed.id,
      name: "Single Bed",
      price: "$200",
      oldPrice: "$250",
      image: "/image/Product_12.jpg",
      description:
        "Comfortable single bed with sturdy frame and stylish design. Perfect for bedrooms, guest rooms, or small apartments.",
      discount: 20,
      rating: 4.6,
      reviews: 188,
    },
    {
      id: 13,
      categoryId: categories.bed.id,
      name: "Double Bed",
      price: "$280",
      image: "/image/Product_13.jpg",
      description:
        "Spacious double bed with durable construction and modern design. Provides ultimate comfort for restful nights.",
      discount: 0,
      rating: 4.8,
      reviews: 241,
    },
    {
      id: 14,
      categoryId: categories.bed.id,
      name: "King Size Bed",
      price: "$350",
      oldPrice: "$400",
      image: "/image/Product_14.jpg",
      description:
        "Luxury king size bed with robust frame and elegant design. Ideal for master bedrooms, ensuring comfort and style.",
      discount: 13,
      rating: 4.9,
      reviews: 305,
    },
    {
      id: 15,
      categoryId: categories.wardrobe.id,
      name: "2-Door Wardrobe",
      price: "$220",
      image: "/image/Product_15.jpg",
      description:
        "Compact 2-door wardrobe with ample storage space and modern finish. Perfect for bedrooms with limited space.",
      discount: 0,
      rating: 4.4,
      reviews: 88,
    },
    {
      id: 16,
      categoryId: categories.wardrobe.id,
      name: "3-Door Wardrobe",
      price: "$280",
      oldPrice: "$320",
      image: "/image/Product_16.jpg",
      description:
        "Spacious 3-door wardrobe with sleek design and functional storage compartments. Ideal for organizing clothes and accessories.",
      discount: 13,
      rating: 4.6,
      reviews: 157,
    },
    {
      id: 17,
      categoryId: categories.wardrobe.id,
      name: "Sliding Wardrobe",
      price: "$300",
      image: "/image/Product_17.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
      description:
        "Modern sliding wardrobe with smooth sliding doors and large storage capacity. Perfect for contemporary bedrooms.",
      discount: 0,
      rating: 4.5,
      reviews: 110,
    },
    {
      id: 18,
      categoryId: categories.shelf.id,
      name: "Wooden Shelf",
      price: "$90",
      image: "/image/Product_18.jpg",
      description:
        "Sturdy wooden shelf suitable for books, decor, or storage. Adds a natural touch to any room with practical functionality.",
      discount: 0,
      rating: 4.3,
      reviews: 64,
    },
    {
      id: 19,
      categoryId: categories.shelf.id,
      name: "Corner Shelf",
      price: "$75",
      image: "/image/Product_19.jpg",
      description:
        "Space-saving corner shelf designed to fit perfectly in small areas. Ideal for decor, books, or plants.",
      discount: 0,
      rating: 4.2,
      reviews: 58,
    },
    {
      id: 20,
      categoryId: categories.shelf.id,
      name: "Bookshelf",
      price: "$110",
      oldPrice: "$130",
      image: "/image/Product_20.jpg",
      description:
        "Classic bookshelf with durable construction and spacious shelves. Perfect for organizing books, decor, and personal items.",
      discount: 15,
      rating: 4.7,
      reviews: 173,
    },
  ],
};

// -----------------------------------------------

// topCategories
export const topCategories = {
  items: [
    {
      id: 1,
      name: "Wing Chair",
      image: "/image/Product_05.jpg",
      quantity: "3,584 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 2,
      name: "Wooden Chair",
      image: "/image/Product_06.jpg",
      quantity: "157 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 3,
      name: "Desk Chair",
      image: "/image/Product_07.png",
      quantity: "154 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 4,
      name: "Park Bench",
      image: "/image/Product_08.jpg",
      quantity: "154 Products",
      categoryId: categories.table.id,
    },
    {
      id: 5,
      name: "Arm Chair",
      image: "/image/Product_09.jpg",
      quantity: "200 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 6,
      name: "Lounge Chair",
      image: "/image/Product_01.jpg",
      quantity: "120 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 7,
      name: "Rocking Chair",
      image: "/image/Product_02.jpg",
      quantity: "80 Products",
      categoryId: categories.chair.id,
    },
    {
      id: 8,
      name: "Study Table",
      image: "/image/Product_03.jpg",
      quantity: "95 Products",
      categoryId: categories.table.id,
    },
    {
      id: 9,
      name: "Coffee Table",
      image: "/image/Product_04.jpg",
      quantity: "120 Products",
      categoryId: categories.table.id,
    },
    {
      id: 10,
      name: "Dining Table",
      image: "/image/Product_10.jpg",
      quantity: "88 Products",
      categoryId: categories.table.id,
    },
    {
      id: 11,
      name: "Single Bed",
      image: "/image/Product_11.jpg",
      quantity: "60 Products",
      categoryId: categories.bed.id,
    },
    {
      id: 12,
      name: "Double Bed",
      image: "/image/Product_12.jpg",
      quantity: "42 Products",
      categoryId: categories.bed.id,
    },
    {
      id: 13,
      name: "King Size Bed",
      image: "/image/Product_13.jpg",
      quantity: "33 Products",
      categoryId: categories.bed.id,
    },
    {
      id: 14,
      name: "Wardrobe 2 Door",
      image: "/image/Product_14.jpg",
      quantity: "77 Products",
      categoryId: categories.wardrobe.id,
    },
    {
      id: 15,
      name: "Wardrobe 3 Door",
      image: "/image/Product_15.jpg",
      quantity: "58 Products",
      categoryId: categories.wardrobe.id,
    },
    {
      id: 16,
      name: "Wardrobe Sliding",
      image: "/image/Product_16.jpg",
      quantity: "42 Products",
      categoryId: categories.wardrobe.id,
    },
    {
      id: 17,
      name: "Wooden Shelf",
      image: "/image/Product_17.jpg",
      quantity: "90 Products",
      categoryId: categories.shelf.id,
    },
    {
      id: 18,
      name: "Corner Shelf",
      image: "/image/Product_18.jpg",
      quantity: "70 Products",
      categoryId: categories.shelf.id,
    },
    {
      id: 19,
      name: "Wall Shelf",
      image: "/image/Product_19.jpg",
      quantity: "120 Products",
      categoryId: categories.shelf.id,
    },
    {
      id: 20,
      name: "Bookshelf",
      image: "/image/Product_20.jpg",
      quantity: "150 Products",
      categoryId: categories.shelf.id,
    },
  ],
};

// -----------------------------------------------

// ourProduct
export const ourProductsData = {
  productsList: [
    // ===== CHAIR =====
    {
      id: 1,
      categoryId: categories.chair.id,
      name: "Modern Library Chair",
      price: "$20",
      image: "/image/Product_01.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 2,
      categoryId: categories.chair.id,
      name: "Classic Wooden Chair",
      price: "$25",
      oldPrice: "$35",
      image: "/image/Product_02.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 3,
      categoryId: categories.chair.id,
      name: "Velvet Armchair",
      price: "$45",
      image: "/image/Product_03.jpg",
    },
    {
      id: 4,
      categoryId: categories.chair.id,
      name: "Rocking Chair",
      price: "$55",
      image: "/image/Product_04.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },

    // ===== TABLE =====
    {
      id: 5,
      categoryId: categories.table.id,
      name: "Study Table",
      price: "$50",
      image: "/image/Product_05.jpg",
    },
    {
      id: 6,
      categoryId: categories.table.id,
      name: "Coffee Table",
      price: "$45",
      image: "/image/Product_06.jpg",
      status: "Sale",
      oldPrice: "$55",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 7,
      categoryId: categories.table.id,
      name: "Dining Table",
      price: "$95",
      image: "/image/Product_07.jpg",
    },
    {
      id: 8,
      categoryId: categories.table.id,
      name: "Round Table",
      price: "$70",
      image: "/image/Product_08.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },

    // ===== BED =====
    {
      id: 9,
      categoryId: categories.bed.id,
      name: "Single Bed",
      price: "$200",
      image: "/image/Product_09.jpg",
    },
    {
      id: 10,
      categoryId: categories.bed.id,
      name: "Queen Bed",
      price: "$260",
      oldPrice: "$290",
      image: "/image/Product_10.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 11,
      categoryId: categories.bed.id,
      name: "King Size Bed",
      price: "$320",
      image: "/image/Product_11.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 12,
      categoryId: categories.bed.id,
      name: "Wooden Bed Frame",
      price: "$240",
      image: "/image/Product_12.jpg",
    },

    // ===== WARDROBE =====
    {
      id: 13,
      categoryId: categories.wardrobe.id,
      name: "2-Door Wardrobe",
      price: "$250",
      oldPrice: "$280",
      image: "/image/Product_13.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 14,
      categoryId: categories.wardrobe.id,
      name: "3-Door Wardrobe",
      price: "$320",
      image: "/image/Product_14.jpg",
    },
    {
      id: 15,
      categoryId: categories.wardrobe.id,
      name: "Sliding Wardrobe",
      price: "$350",
      image: "/image/Product_15.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 16,
      categoryId: categories.wardrobe.id,
      name: "Compact Wardrobe",
      price: "$220",
      image: "/image/Product_16.jpg",
    },

    // ===== SHELF =====
    {
      id: 17,
      categoryId: categories.shelf.id,
      name: "Wall Shelf",
      price: "$70",
      image: "/image/Product_17.jpg",
    },
    {
      id: 18,
      categoryId: categories.shelf.id,
      name: "Corner Shelf",
      price: "$80",
      image: "/image/Product_18.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 19,
      categoryId: categories.shelf.id,
      name: "Bookshelf",
      price: "$110",
      oldPrice: "$130",
      image: "/image/Product_19.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 20,
      categoryId: categories.shelf.id,
      name: "Wooden Display Shelf",
      price: "$90",
      image: "/image/Product_20.jpg",
    },
  ],
};

// -----------------------------------------------

// Testimonial

export const testimonialsData = {
  comments: [
    {
      id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et.",
      avatar: "/image/User_01.png",
      name: "Kristin Watson",
      position: "Fashion Designer",
    },
    {
      id: 2,
      description:
        "Nullam sapien elit, dignissim eu viverra et, scelerisque et felis. Aliquam egestas dui elit, quis tincidunt lacus aliquam et. Duis nulla velit, dignissim ut odio ac, eleifend luctus leo. Ut ac imperdiet velit. Aliquam semper ex in volutpat rutrum.",
      avatar: "/image/User_02.png",
      name: "Esther Howard",
      position: "Fashion Designer",
    },
    {
      id: 3,
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      avatar: "/image/User_01.png",
      name: "Robert Fox",
      position: "Interior Designer",
    },
  ],
};

// -----------------------------------------------

// Recently Add

export const recentlyAddedData = {
  products: [
    {
      id: 1,
      categoryId: categories.chair.id,
      name: "Modern Chair",
      price: "$25",
      oldPrice: "$40",
      image: "/image/Product_01.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 2,
      categoryId: categories.chair.id,
      name: "Office Chair Pro",
      price: "$35",
      image: "/image/Product_02.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
    {
      id: 3,
      categoryId: categories.chair.id,
      name: "Wooden Armchair",
      price: "$30",
      image: "/image/Product_03.jpg",
    },
    {
      id: 4,
      categoryId: categories.chair.id,
      name: "Lounge Chair",
      price: "$45",
      oldPrice: "$60",
      image: "/image/Product_04.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },
    {
      id: 5,
      categoryId: categories.table.id,
      name: "Study Table",
      price: "$70",
      oldPrice: "$85",
      image: "/image/Product_05.jpg",
    },
    {
      id: 6,
      categoryId: categories.table.id,
      name: "Dining Table Set",
      price: "$120",
      image: "/image/Product_06.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },

    {
      id: 7,
      categoryId: categories.bed.id,
      name: "Single Bed Frame",
      price: "$210",
      image: "/image/Product_07.jpg",
    },
    {
      id: 8,
      categoryId: categories.bed.id,
      name: "King Size Bed",
      price: "$350",
      oldPrice: "$400",
      image: "/image/Product_08.jpg",
      status: "New",
      tagColor: "bg-[#01AD5A]",
    },

    {
      id: 9,
      categoryId: categories.wardrobe.id,
      name: "3-Door Wardrobe",
      price: "$280",
      image: "/image/Product_09.jpg",
    },

    {
      id: 10,
      categoryId: categories.shelf.id,
      name: "Wall Shelf",
      price: "$75",
      image: "/image/Product_10.jpg",
      status: "Sale",
      tagColor: "bg-[#F5813F]",
    },
  ],
};
