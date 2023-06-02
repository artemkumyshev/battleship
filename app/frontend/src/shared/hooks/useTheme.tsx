import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const useTheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const scheme = value || colorScheme === "dark" ? "light" : "dark";
    setColorScheme(scheme);
  };

  return {
    colorScheme,
    toggleColorScheme,
  };
};

export default useTheme;
