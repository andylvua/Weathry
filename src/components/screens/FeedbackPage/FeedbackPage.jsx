import Layout from "../../layout/Layout";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
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
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

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

    emailjs.sendForm("service_3h7ikkq", "template_wxskc6y", form.current, "wGyV6Jdk4spTg9cDg").then(
      () => {
        setIsSubmitting(false);
        setFeedbackForm({ ...feedbackForm, email: "", text: "" });
        setSuccessDialogOpen(true);
      },
      () => {
        setIsSubmitting(false);
        setFeedbackForm({ ...feedbackForm, email: "", text: "" });
        setErrorDialogOpen(true);
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

  const closeSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const FormAlert = ({ isOpen, onClose, title, description, color }) => {
    return (
      <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={color}>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return (
    <Layout>
      <form ref={form} onSubmit={handleSubmit}>
        <Heading textAlign={"center"} mt={20} mb={10} color={"white"}>
          Feedback
        </Heading>

        <GradientBlock
          withoutPaddings={true}
          p={{ sm: 7, usm: 3 }}
          maxW={800}
          mt={5}
          mx={"auto"}
          overflow={"hidden"}
        >
          <Flex gap={8} flexDirection={"column"}>
            <FormControl>
              <FormLabel as="legend">
                <Flex>
                  <Text fontSize={"xl"} color={"white"} fontWeight={"bold"} ml={2}>
                    Type of feedback
                  </Text>
                  <Text color={"red"}>*</Text>
                </Flex>
              </FormLabel>
              <RadioGroup defaultValue={feedbackForm.mailType} ml={2}>
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
                  <Text fontSize={"xl"} color={"white"} fontWeight={"bold"} ml={2}>
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
                  <Text fontSize={"xl"} color={"white"} fontWeight={"bold"} ml={2}>
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
              colorScheme={"green"}
            >
              Submit
            </Button>
          </Flex>
        </GradientBlock>
        <FormAlert
          isOpen={successDialogOpen}
          onClose={closeSuccessDialog}
          title={"Message sent"}
          description={"Feedback has been successfully sent. Thank you for your help!"}
          color={"green.500"}
        />
        <FormAlert
          isOpen={errorDialogOpen}
          onClose={closeErrorDialog}
          title={"Error sending"}
          description={"Error occurred while sending feedback. Please try again later."}
          color={"red.500"}
        />
      </form>
    </Layout>
  );
};

export default FeedbackPage;
