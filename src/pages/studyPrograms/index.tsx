import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "./studyPrograms.module.css";
import StudyProgramSwiper from "../../components/StudyProgramSwiper";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import FormStudyProgram from "../../forms/formStudyProgram";
import PillCheckbox from "@/components/PillCheckbox";
import Account from "@/components/Account";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

const StudyPrograms: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [programs, setPrograms] = useState<any[]>([]);
  const [studyModal, setStudyModal] = useState(false);

  async function getInitialStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");
    setPrograms(study_programs);
  }

  useEffect(() => {
    getInitialStudyPrograms();
  }, []);

  function ModalclickHandler() {
    setStudyModal(!studyModal);
  }

  async function getData(name, specialization, active) {
    let { error } = await supabase
      .from("study_programs")
      .insert([{ name, specialization, active }]);

    if (error) {
      console.log(error);
    } else {
      setStudyModal(false);
      window.location.reload();
    }
  }

  if (programs) {
    return (
      <>
        <div>
          {!session ? (
            <Auth providers={[]} supabaseClient={supabase} />
          ) : (
            <Account session={session} />
          )}
        </div>

        {session ? (
          <button className="button--primary" onClick={ModalclickHandler}>
            Neuen Studiengang hinzufügen
          </button>
        ) : (
          <div></div>
        )}
        <h1>Studiengänge</h1>
        {studyModal && (
          <ModalOffCanvas
            button="yes"
            headline={"Neuen Studiengang hinzufügen"}
            setModal={setStudyModal}
          >
            <FormStudyProgram onSubmit={getData} />
          </ModalOffCanvas>
        )}
        <div className={styles.studyProgram}>
          <div className={styles.studyProgram__swipersection}>
            <StudyProgramSwiper
              programs={programs}
              setStudyModal={setStudyModal}
            />
          </div>
          <div className={styles.studyProgram__filter}>
            <form>
              <PillCheckbox
                label={"Bachelor"}
                id="bachelor"
                name="degree"
                checked={false}
              />
              <PillCheckbox
                label={"Master"}
                id="master"
                name="degree"
                checked={false}
              />
              <PillCheckbox
                label={"Promotion"}
                id="promotion"
                name="degree"
                checked={false}
              />

              <PillCheckbox
                label={"dual"}
                id="dual"
                name="studyType"
                checked={false}
              />
              <PillCheckbox
                label={"berufsbegleitend"}
                id="berufsbegleitend"
                name="studyType"
                checked={false}
              />
              <PillCheckbox
                label={"vollzeit"}
                id="vollzeit"
                name="studyType"
                checked={false}
              />
              <PillCheckbox
                label={"verkürzt"}
                id="verkürzt"
                name="studyType"
                checked={false}
              />

              <button
                type={"submit"}
                className={`${"button--primary"} ${
                  styles.studyPrograms__setFilter
                }`}
                /*onSubmit={ programs = filterFunction(degree[0])}*/
              >
                Filter Anwenden
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default StudyPrograms;
