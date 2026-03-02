import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { nonScroll } from "./nonScroll";
import { useThemeContext } from "client/contexts/themeContext";

export const DEFAULT_MAIN_COLOR = "#7B68EE";

export const symbolColors = {
  resource: "#D4AF37",
  species: "#5D4037",
  building: "#78909C",
  node: "#B8860B",
  service: "#4CAF50",
};

type Props = {
  children: ReactNode;
};

const MainThemeProvider = ({ children }: Props) => {
  const { isDarkMode } = useThemeContext();
  const mainColor = DEFAULT_MAIN_COLOR;

  const mainTheme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        palette: {
          primary: {
            main: mainColor,
          },
          mode: isDarkMode ? "dark" : "light",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                ...nonScroll,
              },
              body: {
                backgroundColor: !isDarkMode ? "#F9F9F9" : "#121212",
              },
              img: {
                maxWidth: "100%",
                height: "auto",
                verticalAlign: "bottom",
                background: "#2a2a2a",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                "&.Mui-expanded": {
                  boxShadow: "0 12px 24px -4px rgba(145, 158, 171, 0.12)",
                  borderRadius: "8px",
                },
                "&.Mui-disabled": {
                  backgroundColor: "transparent",
                },
                "&:first-of-type": {
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                },
                "&:last-of-type": {
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                // backgroundColor: "red",
                // paddingLeft: theme.spacing(2),
                // paddingRight: theme.spacing(1),
                "&.Mui-disabled": {
                  opacity: 1,
                  // color: theme.palette.action.disabled,
                  "& .MuiTypography-root": {
                    color: "inherit",
                  },
                },
              },
              expandIconWrapper: {
                color: "inherit",
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                fontFamily: "Pretendard",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: "0 12px 24px -4px rgba(145, 158, 171, 0.12)",
                borderRadius: "8px",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: "Pretendard",
              },
            },
          },
          MuiInput: {
            styleOverrides: {
              root: {
                fontFamily: "Pretendard",
              },
            },
          },
        },
      }),
    [mainColor, isDarkMode],
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;
