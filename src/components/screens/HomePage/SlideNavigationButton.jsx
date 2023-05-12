import { Icon, IconButton } from "@chakra-ui/react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSwiper } from "swiper/react";

const SlideNavigationButton = ({ type }) => {
  const swiper = useSwiper();
  return (
    <>
      {type === "prev" ? (
        <IconButton onClick={() => swiper.slidePrev()} aria-label={""}>
          <Icon w={5} h={5} as={MdArrowBackIosNew} />
        </IconButton>
      ) : (
        <IconButton onClick={() => swiper.slideNext()} aria-label={""}>
          <Icon w={5} h={5} as={MdArrowForwardIos} />
        </IconButton>
      )}
    </>
  );
};

export default SlideNavigationButton;
