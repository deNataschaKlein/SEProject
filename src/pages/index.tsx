import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
function Home() {
  const name = "NO_NAME";
  const session = useSession();

  useEffect(() => {
    if (!session) {
      window.location.href = "studyPrograms";
    }
  }, [session]);

  return (
    <>
      {session && (
        <div>
          <h1>Hallo {name}</h1>
          <div className={styles.box}>
            <Link href="/applications" className={styles.nav__li}>
              <Button variant="text" startIcon={<AssignmentIndIcon />}>
                Zu den Bewerbungen
              </Button>
            </Link>
          </div>
          <div className={styles.box}>
            <Link href="/evaluations" className={styles.nav__li}>
              <Button variant="text" startIcon={<AssignmentIndIcon />}>
                Zu den Evaluationsbögen
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.home}>
        <div className={styles.box}>
          <Link href="/studyPrograms" className={styles.nav__li}>
            <Button variant="text" startIcon={<RocketLaunchIcon />}>
              Zu den Studiengängen
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
