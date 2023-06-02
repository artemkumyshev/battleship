import React from "react";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActionIcon, Box, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import Cookies from "universal-cookie";

import { publicRouter, privateRouter } from "@/routes/index";

import useTheme from "@/hooks/useTheme";
import { useStore } from "effector-react";
import { $auth } from "./shared/store/auth";

const queryClient = new QueryClient();
const cookies = new Cookies();

function App() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const isLoggedIn = useStore($auth);

  console.log("@@@ cookies", cookies.getAll());

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles>
          <Box pos="absolute" right={20} top={20}>
            <ActionIcon
              variant="outline"
              color={colorScheme === "dark" ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {colorScheme === "dark" ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
            </ActionIcon>
          </Box>
          <RouterProvider router={isLoggedIn ? privateRouter : publicRouter} />
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
