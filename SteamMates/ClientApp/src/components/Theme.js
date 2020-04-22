import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const containerWidth = 1050;

const sizes = {
  big: containerWidth,
  medium: 768,
  small: 480,
  smaller: 450,
  verySmall: 360,
  extraSmall: 200
};

const initialThemeState = {
  sizes: sizes,
  queries: {
    big: `min-width: ${sizes.big}px`,
    medium: `min-width: ${sizes.medium}px`,
    small: `min-width: ${sizes.small}px`,
    smaller: `min-width: ${sizes.smaller}px`,
    verySmall: `min-width: ${sizes.verySmall}px`,
    extraSmall: `min-width: ${sizes.extraSmall}px`
  },
  containerWidth: containerWidth,
  scrollbarWidth: 0
};

const updateScrollbarWidth = (theme, scrollbarWidth) => {
  sizes.big = containerWidth + scrollbarWidth;
  theme.queries.big = `min-width: ${sizes.big}px`;
  theme.scrollbarWidth = scrollbarWidth;

  return theme;
};

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState);
  const [width] = useWindowSize();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth !== theme.scrollbarWidth) {
      setTheme(prevState => updateScrollbarWidth(prevState, scrollbarWidth));
    }
  }, [theme, width]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
