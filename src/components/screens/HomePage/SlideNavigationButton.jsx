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
        <IconButton onClick={handleClick} aria-label={""}>
          <Icon w={5} h={5} as={MdArrowBackIosNew} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClick} aria-label={""}>
          <Icon w={5} h={5} as={MdArrowForwardIos} />
        </IconButton>
      )}
    </>
  );
};

export default SlideNavigationButton;
