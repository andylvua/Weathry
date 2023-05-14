import { Icon, IconButton } from "@chakra-ui/react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSwiper } from "swiper/react";

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
