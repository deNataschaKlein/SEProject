import { useSession } from "@supabase/auth-helpers-react";
import styles from "@/styles/Home.module.css";
import * as AiIcons from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";
import Login from "@/components/Login";

export default function NavBar() {
  const [navBar, setNavBar] = useState(false);
  const showNav = () => setNavBar(!navBar);
  const session = useSession();

  return (
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
              {session && (
                <>
                  <Link href="/applications" className={styles.nav__li}>
                    Bewerbungen
                  </Link>
                  <Link href="/evaluations" className={styles.nav__li}>
                    Evaluationen
                  </Link>
                </>
              )}
            </div>
            <Login />
          </div>
        )}
      </nav>
    </aside>
  );
}
