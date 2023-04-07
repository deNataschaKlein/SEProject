import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {ThemeProvider, createTheme} from '@mui/material/styles'
import styles from "@/styles/Home.module.css";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

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

  const [navBar, setNavBar] = useState(false);
  const showNav = () => setNavBar(!navBar);


  return <ThemeProvider theme={customTheme}>
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
          <div className={styles.nav__ul}>
            <Link href="/studyPrograms" className={styles.nav__li}>Studiengänge</Link>
            <Link href="/applications" className={styles.nav__li}>Bewerbungen</Link>
          </div>
        )}
      </nav>
    </aside>

    <main className={styles.content}><Component {...pageProps} /></main>

  </ThemeProvider>;
}
