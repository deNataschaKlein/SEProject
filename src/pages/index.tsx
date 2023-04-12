import { supabase } from "../../lib/supabaseClient";
import StudyPrograms from "@/pages/studyPrograms/studyPrograms";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from "../styles/Home.module.css";

function Home() {
  const session = useSession()
  const [navBar, setNavBar] = useState(false);
  const showNav = () => setNavBar(!navBar);

  return (
    <>
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
            <ul>
              <li>Studiengänge</li>
              <li>Bewerben</li>
              {session ?
              <>
                <li>Bewerbungen</li>
                <li>Evaluationsbögen</li>
              </> : <>
              </>}
            </ul>
          )}
        </nav>
      </aside>
      <main className={styles.content}>
        <StudyPrograms />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("study_programs").select();

  return {
    props: {
      study_programs: data,
    },
  };
}

export default Home;
