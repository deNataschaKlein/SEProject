import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";
import Account from "@/components/Account";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "@/styles/Home.module.css";
import * as AiIcons from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [navBar, setNavBar] = useState(false);
  const showNav = () => setNavBar(!navBar);
  const session = useSession();

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
