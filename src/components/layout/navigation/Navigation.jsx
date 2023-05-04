import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import Menu from "./Menu";

const Navigation = () => {
  return (
    <GradientBlock withoutPaddings={true} className={"my-3 ml-3"}>
      <div className={"flex flex-col items-center basis-10 py-6"}>
        <Menu />
      </div>
    </GradientBlock>
  );
};

export default Navigation;
