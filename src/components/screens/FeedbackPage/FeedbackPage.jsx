import Layout from "../../layout/Layout";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";

const FeedbackPage = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    emailjs.sendForm("service_fjgbi4e", "template_vgej6tc", form.current, "sGi4vSjMMbNXBNIpc").then(
      () => {
        setIsSubmitting(false);
        setFeedbackForm({ ...feedbackForm, email: "", text: "" });
      },
      () => {
        setIsSubmitting(false);
        setFeedbackForm({ ...feedbackForm, email: "", text: "" });
      }
    );
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
      <form ref={form} onSubmit={handleSubmit}>
        <Heading textAlign={"center"} mt={10} mb={10} color={"white"}>
          Feedback
        </Heading>

        <GradientBlock withoutPaddings={true} p={{ sm: 7, usm: 3 }} maxW={800} mt={5} mx={"auto"}>
          <Flex gap={8} flexDirection={"column"}>
            <FormControl>
              <FormLabel as="legend">
                <Flex>
                  <Text fontSize={"xl"} color={"white"}>
                    Type of feedback
                  </Text>
                  <Text color={"red"}>*</Text>
                </Flex>
              </FormLabel>
              <RadioGroup defaultValue={feedbackForm.mailType}>
                <Flex flexDirection={{ md: "row", usm: "column" }} gap="24px">
                  <Radio
                    name={"mailType"}
                    onChange={onChangeValue}
                    checked={feedbackForm.mailType === "Tell about the problem"}
                    value="Tell about the problem"
                  >
                    Tell about the problem
                  </Radio>
                  <Radio
                    name={"mailType"}
                    onChange={onChangeValue}
                    checked={feedbackForm.mailType === "Suggest new features"}
                    value="Suggest new features"
                  >
                    Suggest new features
                  </Radio>
                </Flex>
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
                name={"email"}
                value={feedbackForm.email}
                onChange={handleInputEmailChange}
                placeholder={"Enter your email..."}
              />
              {feedbackFormErrors.email && <FormErrorMessage>Email is not valid.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={feedbackFormErrors.text}>
              <FormLabel>
                <Flex>
                  <Text fontSize={"xl"} color={"white"}>
                    Message
                  </Text>
                  <Text color={"red"}>*</Text>
                </Flex>
              </FormLabel>
              <Textarea
                name={"text"}
                type="text"
                value={feedbackForm.text}
                onChange={handleInputTextChange}
                placeholder={"Enter your message..."}
              />
              {feedbackFormErrors.text && <FormErrorMessage>Text is required.</FormErrorMessage>}
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type={"submit"}
              width={"25%"}
              alignSelf={"center"}
              borderRadius={20}
              variant={"outline"}
            >
              Submit
            </Button>
          </Flex>
        </GradientBlock>
      </form>
    </Layout>
  );
};

export default FeedbackPage;
