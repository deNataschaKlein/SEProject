import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Link from "next/link";
function Home() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.box}>
          <Link href="/studyPrograms" className={styles.nav__li}>
            <Button variant="text" startIcon={<RocketLaunchIcon />}>
              Zu den Studiengängen
            </Button>
          </Link>
        </div>
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
    </>
  );
}

export default Home;
