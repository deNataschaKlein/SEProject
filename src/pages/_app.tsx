import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {ThemeProvider, createTheme} from '@mui/material/styles'

export default function App({ Component, pageProps }: AppProps) {

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#ff9900',
      },
      secondary: {
        main: '#D9D9D9',
      }

    }
  });
  return <ThemeProvider theme={customTheme}><Component {...pageProps} /></ThemeProvider>;
}
