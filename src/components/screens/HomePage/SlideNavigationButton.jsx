import { Icon, IconButton } from "@chakra-ui/react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export const swiperProps = {
  spaceBetween: 5,
  slidesPerView: 8,
  breakpoints: {
    0: {
      slidesPerView: 3
    },
    540: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 5
    },
    1300: {
      slidesPerView: 6
    },
    1500: {
      slidesPerView: 7
    },
    1700: {
      slidesPerView: 9
    },
    1900: {
      slidesPerView: 10
    }
  }
};

const SlideNavigationButton = ({ type, swiper }) => {
  const handleClick = () => {
    if (!swiper) {
      return;
    }

    if (type === "prev") {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  };

  return (
    <>
      {type === "prev" ? (
        <IconButton onClick={handleClick} aria-label={""} height={7}>
          <Icon w={4} h={4} as={MdArrowBackIosNew} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClick} aria-label={""} height={7}>
          <Icon w={4} h={4} as={MdArrowForwardIos} />
        </IconButton>
      )}
    </>
  );
};

export default SlideNavigationButton;
