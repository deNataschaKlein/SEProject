import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./studyProgramSwiper.module.css";

// import required modules
import { Mousewheel, Navigation, Pagination } from "swiper";
import { supabase } from "../../lib/supabaseClient";

export default function StudyProgramSwiper({
  setStudyModal,
  onSetCurrent,
  session,
  setModalHeadline,
}: any) {
  const [programs, setPrograms] = useState<any[] | null>([]);
  const [programNames, setProgramNames] = useState<any[] | null>([]);
  const [deactivated, setDeactivated] = useState<any[] | null>([]);

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");

    setPrograms(study_programs);
  }

  async function getStudyNames() {
    let { data } = await supabase.from("study_name").select("*");

    setProgramNames(data);
  }

  async function getDeactivated() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("active", false);
    setDeactivated(study_programs);
  }

  function clickHandler(program: any[]) {
    setStudyModal(true);
    if (session) {
      setModalHeadline("Studiengang bearbeiten");
    } else setModalHeadline("Bewirb dich jetzt");

    onSetCurrent(program);
  }
  useEffect(() => {
    getStudyPrograms();
    getDeactivated();
    getStudyNames();
  }, []);

  return (
    <>
      {programNames?.map((programName, _index) => (
        <div className={styles.swiperbox} key={programName.id}>
          <h2 className="primary">{programName.name}</h2>
          <Swiper
            breakpoints={{
              700: {
                width: 700,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 3,
              },
            }}
            spaceBetween={14}
            navigation={true}
            modules={[Pagination, Mousewheel, Navigation]}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            className={styles.study_swiper}
          >
            {programs
              ?.filter(
                (program) =>
                  program.study_name == programName.id && program.active
              )
              .map((program, _index) => (
                <SwiperSlide
                  className={styles.swiper__slide}
                  onClick={() => clickHandler(program)}
                  key={program.id}
                >
                  {program.specialization}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}

      {session && (
        <div className={styles.deactivated}>
          {deactivated?.map((program, _index) => (
            <div
              key={_index}
              className={styles.deactivated__object}
              onClick={() => clickHandler(program)}
            >
              {program.specialization}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
