import GradientBlock from "../ui/GradientBlock/GradientBlock";
import Layout from "../layout/Layout";
import { Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import SearchModal from "../modals/search-modal/SearchModal";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../store/search-modal/SearchModalSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const onOpen = () => dispatch(setIsOpen(true));

  return (
    <Layout>
      <GradientBlock>
        <Heading>Some title</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
          dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod, ratione
          sed suscipit! Exercitationem nihil odio perspiciatis.
        </Text>
      </GradientBlock>
      <Flex gap={3} mt={3}>
        <GradientBlock>
          <Heading>Some title</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </Text>
        </GradientBlock>
        <GradientBlock>
          <Heading>Some title</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet atque debitis
            dolorum facere fugiat inventore labore modi obcaecati quaerat quas quisquam quod,
            ratione sed suscipit! Exercitationem nihil odio perspiciatis.
          </Text>
        </GradientBlock>
      </Flex>
      <IconButton aria-label={"iconBase"} onClick={onOpen}>
        <Icon w={30} h={30} as={MdSearch} />
      </IconButton>
      <SearchModal />
    </Layout>
  );
};
export default HomePage;
