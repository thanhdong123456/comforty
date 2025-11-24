import React, { useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import CommentSlider from "../common/commentSlider";

const Testimonial = ({ testimonials }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const comments = testimonials?.comments || [];
  const hasComments = comments.length > 0;

  return (
    <section className="relative w-full py-10 md:py-12 lg:py-20  bg-[#f0f2f3]">
      <div className="w-full px-4 xl:px-0 max-w-[1320px] mx-auto">
        <div className="flex items-center justify-between flex-nowrap gap-3 sm:gap-6 mb-10 text-left">
          <h3 className="text-[18px] xs:text-[20px] sm:text-[24px] lg:text-[32px] font-semibold capitalize text-[#272343] truncate">
            What client says about us
          </h3>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              ref={prevRef}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-[#029FAE] hover:text-white transition-all duration-300"
            >
              <FaArrowLeftLong className="text-[14px] sm:text-[16px]" />
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-[#029FAE] hover:text-white transition-all duration-300"
            >
              <FaArrowRightLong className="text-[14px] sm:text-[16px]" />
            </button>
          </div>
        </div>
        {hasComments ? (
          <CommentSlider
            comments={comments}
            prevRef={prevRef}
            nextRef={nextRef}
          />
        ) : (
          <div className="w-full text-center text-gray-500 text-sm sm:text-base md:text-lg font-medium py-10 sm:py-16 md:py-20 px-4">
            There are no reviews yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
