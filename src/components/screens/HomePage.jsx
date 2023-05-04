import GradientBlock from "../ui/GradientBlock/GradientBlock";
import Layout from "../layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <GradientBlock className={"text-white"}>
        <h1 className={"text-2xl"}>Some title</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
          dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod, ratione
          sed suscipit! Exercitationem nihil odio perspiciatis.
        </div>
      </GradientBlock>
      <div className={"flex gap-3 mt-3"}>
        <GradientBlock className={"text-white"}>
          <h1 className={"text-2xl"}>Some title</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </div>
        </GradientBlock>
        <GradientBlock className={"text-white"}>
          <h1 className={"text-2xl"}>Some title</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </div>
        </GradientBlock>
      </div>
    </Layout>
  );
};
export default HomePage;
