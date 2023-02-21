import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import styles from "./studyPrograms.module.css";
import StudyProgramSwiper from "../../components/StudyProgramSwiper";

function StudyPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");
    setPrograms(study_programs);
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

        <div className={styles.studyProgram}>
          <div className={styles.studyProgram__swipersection}>
            hier kommen die Studiengänge rein
            <StudyProgramSwiper props={programs} />
          </div>
          <div className={styles.studyProgram__filter}>
            Hier die Filterfunktion
          </div>
        </div>

        {/*<Swiper>
          <SwiperSlide>test</SwiperSlide>
          <SwiperSlide>test</SwiperSlide>
          <SwiperSlide>test</SwiperSlide>
          <SwiperSlide>test</SwiperSlide>
        </Swiper>*/}
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
