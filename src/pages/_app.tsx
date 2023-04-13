import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "@/styles/Home.module.css";
import * as AiIcons from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";

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
        <aside className={styles.navBar}>
          <nav>
            <div onClick={showNav}>
              {navBar ? (
                <AiIcons.AiOutlineClose size={28} />
              ) : (
                <AiIcons.AiOutlineMenu size={28} />
              )}
            </div>

            {navBar && (
              <div className={styles.navBar__sections}>
                <div className={styles.nav__ul}>
                  <Link href="/studyPrograms" className={styles.nav__li}>
                    Studiengänge
                  </Link>
                  <Link href="/applications" className={styles.nav__li}>
                    Bewerbungen
                  </Link>
                </div>
                {/*<div className={styles.login}>
                  {!session ? (
                    <Auth providers={[]} supabaseClient={supabase} />
                  ) : (
                    <Account session={session} />
                  )}
                </div>*/}
              </div>
            )}
          </nav>
        </aside>
        <main className={styles.content}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionContextProvider>
  );
}
