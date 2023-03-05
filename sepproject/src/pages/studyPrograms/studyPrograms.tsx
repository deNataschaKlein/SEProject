import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import styles from "./studyPrograms.module.css";
import StudyProgramSwiper from "../../components/StudyProgramSwiper";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import formStudyProgram from "../../forms/studyProgram";

function StudyPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [studyModal, setStudyModal] = useState(false);
  const [name, setName] = useState('');

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");
    setPrograms(study_programs);
  }

  const handleSubmit = async (e) => {
    let { data: study_programs } = await supabase
    .from("study_programs")
    .insert([{ name }])
    setName(study_programs)
  }
  

  useEffect(() => {
    getStudyPrograms();
  }, []);

  if (programs) {
    return (
      <>
        <h1>Studiengänge</h1>
        <ul>
          {programs.map((program) => (
            <li key={program.id}>{program.name}</li>
          ))}
        </ul>
        {studyModal && (
          <ModalOffCanvas
            button="yes"
            content={<formStudyProgram />}
            setModal={setStudyModal}
          />
        )}

        <form onSubmit={handleSubmit}>
          <label>
            <input className={styles.submitInput} type="text" name="name" placeholder="Studiengang hinzufügen" value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <button className={styles.submitButton}>Anlegen</button>
        </form>

        <div className={styles.studyProgram}>
          <div className={styles.studyProgram__swipersection}>
            <StudyProgramSwiper
              programs={programs}
              setStudyModal={setStudyModal}
            />
          </div>
          <div className={styles.studyProgram__filter}>
            Hier die Filterfunktion
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps() {
  let { data } = await supabase.from("study_programs").select();

  return {
    props: {
      study_programs: data,
    },
  };
}

export default StudyPrograms;
