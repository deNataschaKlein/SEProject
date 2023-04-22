import styles from "./studyPrograms.module.css";
import { NextPage } from "next";
import React, { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@mui/material";
import StudyProgramSwiper from "@/components/StudyProgramSwiper";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import FormStudyProgram from "@/forms/formStudyProgram";
import FormApplication from "@/forms/formApplication";

const StudyProgram: NextPage = () => {
  const session = useSession();

  const [studyModal, setStudyModal] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [programs, setPrograms] = useState<any[]>([]);
  const [studyNames, setStudyNames] = useState<any[]>([]);
  const [modalHeadline, setModalHeadline] = useState<string>("");

  function ModalclickHandler() {
    setStudyModal(!studyModal);
    if (session) {
      setModalHeadline("Neuer Studiengang");
    } else setModalHeadline("Jetzt Bewerben");
    if (current != undefined) {
      setCurrent(undefined);
    }
  }

  function handleCurrent(data: any) {
    setCurrent(data);
  }

  return (
    <>
      <h1>Studiengänge</h1>
      {session ? (
      
        <Button className="button--primary mb-1 " onClick={ModalclickHandler}>

          Neuen Studiengang hinzufügen
        </Button>
      ) : (
        <Button
          className="mb-1 "
          variant={"contained"}
          onClick={ModalclickHandler}
        >
          Jetzt Bewerben
        </Button>
      )}
      <div className={styles.studyProgram}>
        <div className={styles.studyProgram__swipersection}>
          <StudyProgramSwiper
            setStudyModal={setStudyModal}
            onSetCurrent={handleCurrent}
            setModalHeadline={setModalHeadline}
            session={session}
          />
        </div>

        {/*Modal for the Forms*/}

        {studyModal && (
          <ModalOffCanvas
            button="yes"
            headline={modalHeadline}
            setModal={setStudyModal}
          >
            {session ? (
              <FormStudyProgram current={current} />
            ) : (
              <FormApplication
                current={current}
                studyPrograms={programs}
                studyNames={studyNames}
              />
            )}
          </ModalOffCanvas>
        )}
      </div>
    </>
  );
};

export default StudyProgram;
