import React from "react";
import { Container, Flex, Loader } from "@mantine/core";

const SuspendedWithSpinner: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <Container size="30rem" px="xl">
          <Flex mih={'100vh'} gap="md" justify="center" align="center" direction="row" wrap="wrap">
            <Loader size="xl" />
          </Flex>
        </Container>
      }
    >
      {children}
    </React.Suspense>
  );
};

export default SuspendedWithSpinner;
