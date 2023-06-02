import React from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Anchor,
  Button,
  Container,
  Flex,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { IconFaceId, IconLock, IconUserCircle } from "@tabler/icons-react";

import { routePath } from "@/routes/paths";
import { useAuthSignInMutation } from "@/api/hooks/useAuthSignInMutation";
import { setAuth, setEmail } from "@/store/auth";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignInPage: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: { email: (value) => (value.length < 3 ? "Email must have at least 3 letters" : null) },
  });
  const { mutateAsync, isLoading } = useAuthSignInMutation();

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data, {
      onSuccess: ({
        data: {
          data: {
            user: { email },
          },
        },
      }) => {
        setAuth(true);
        setEmail(email);
      },
      onError: () => {
        setAuth(false);
        setEmail("");
      },
    });
  };

  return (
    <Container size={420} my={40} w="100%" h="100vh">
      <Modal opened={false} onClose={close} title="Verify your identy">
        <Flex justify="center" direction="column" align="center" gap="sm" mt="sm">
          <IconFaceId size="5rem" />
          <Text size="sm">needs to verify you</Text>
          <Button mt="lg" variant="subtle">
            use public key
          </Button>
        </Flex>
      </Modal>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor component={Link} size="sm" to={routePath.SIGN_UP}>
          Create account
        </Anchor>
      </Text>
      <Paper
        pos="relative"
        component="form"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <TextInput
          label="Email"
          placeholder="Email"
          autoFocus
          icon={<IconUserCircle size="1rem" />}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          icon={<IconLock size="1rem" />}
          {...form.getInputProps("password")}
        />
        <Group position="right" mt="lg">
          <Anchor component="button" type="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl">
          Sign in
        </Button>
        <Button type="button" fullWidth mt="sm" variant="light">
          Use face id
        </Button>
      </Paper>

      {/* <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@mantine.dev" required />
        <Group position="apart" mt="lg">
          <Anchor color="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft size={rem(12)} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button>Reset password</Button>
        </Group>
      </Paper> */}
    </Container>
  );
};

export default SignInPage;
