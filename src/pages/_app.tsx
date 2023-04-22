import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "@/styles/Home.module.css";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#ff9900",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={customTheme}>
        <NavBar />
        <main className={styles.content}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionContextProvider>
  );
}
