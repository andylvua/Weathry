import Layout from "../../layout/Layout";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";

const FeedbackPage = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    mailType: "Tell about the problem",
    email: "",
    text: ""
  });
  const [feedbackFormErrors, setFeedbackFormErrors] = useState({
    email: false,
    text: false
  });
  const onChangeValue = (event) => {
    setFeedbackForm({ ...feedbackForm, mailType: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (feedbackForm.email === "") {
      setFeedbackFormErrors(() => ({ ...feedbackFormErrors, email: true }));
      return;
    }
    if (feedbackForm.text === "") {
      setFeedbackFormErrors(() => ({ ...feedbackFormErrors, text: true }));
      return;
    }

    console.log(`
    ${feedbackForm.mailType}
    
    ${feedbackForm.email}
    
    ${feedbackForm.text}
    `);
  };

  const handleInputEmailChange = (event) => {
    setFeedbackForm({ ...feedbackForm, email: event.target.value });
    setFeedbackFormErrors({ text: feedbackFormErrors.text, email: false });
  };
  const handleInputTextChange = (event) => {
    setFeedbackForm(() => ({ ...feedbackForm, text: event.target.value }));
    setFeedbackFormErrors(() => ({ email: feedbackFormErrors.email, text: false }));
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Flex gap={8} flexDirection={"column"} mx={"auto"} maxW={800}>
          <Heading mt={5} textAlign={"center"}>
            Feedback
          </Heading>
          <FormControl as="fieldset">
            <FormLabel as="legend">
              <Flex>
                <Text fontSize={"xl"} color={"white"}>
                  What do you want to tell
                </Text>
                <Text color={"red"}>*</Text>
              </Flex>
            </FormLabel>
            <RadioGroup defaultValue={feedbackForm.mailType}>
              <HStack spacing="24px">
                <Radio
                  onChange={onChangeValue}
                  checked={feedbackForm.mailType === "Tell about the problem"}
                  value="Tell about the problem"
                >
                  Tell about the problem
                </Radio>
                <Radio
                  onChange={onChangeValue}
                  checked={feedbackForm.mailType === "Suggest new features"}
                  value="Suggest new features"
                >
                  Suggest new features
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isInvalid={feedbackFormErrors.email}>
            <FormLabel>
              <Flex>
                <Text fontSize={"xl"} color={"white"}>
                  Email
                </Text>
                <Text color={"red"}>*</Text>
              </Flex>
            </FormLabel>
            <Input
              type="email"
              value={feedbackForm.email}
              onChange={handleInputEmailChange}
              placeholder={"email"}
            />
            {!feedbackFormErrors.email ? (
              <FormHelperText>Enter the email.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={feedbackFormErrors.text}>
            <FormLabel>
              <Flex>
                <Text fontSize={"xl"} color={"white"}>
                  Text
                </Text>
                <Text color={"red"}>*</Text>
              </Flex>
            </FormLabel>
            <Textarea
              type="text"
              value={feedbackForm.text}
              onChange={handleInputTextChange}
              placeholder={"Text..."}
            />
            {!feedbackFormErrors.text ? (
              <FormHelperText>Enter text.</FormHelperText>
            ) : (
              <FormErrorMessage>Text is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button type={"submit"}>Submit</Button>
        </Flex>
      </form>
    </Layout>
  );
};

export default FeedbackPage;
