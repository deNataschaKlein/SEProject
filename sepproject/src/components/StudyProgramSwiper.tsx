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

export default function StudyProgramSwiper({ setStudyModal }) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [specializations, setSpecializations] = useState<any[]>([]);

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");
    setPrograms(study_programs);
  }

  async function getSpecializations() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq('id', "1")
   
      setSpecializations(study_programs);
  }

  useEffect(() => {
    getStudyPrograms();
    getSpecializations();
  }, []);

  function clickHandler() {
    setStudyModal(true);
  }

  return (
    <>
      {programs.map((program) => (
        <div className={styles.swiperbox} key={program.name}>
          <h2 className="primary">{program.name}</h2>
          <Swiper
            breakpoints={{
              490: {
                width: 480,
                slidesPerView: 1,
              },
              640: {
                width: 640,
                slidesPerView: 2,
              },
              768: {
                width: 768,
                slidesPerView: 4,
              },
            }}
            spaceBetween={30}
            navigation={true}
            modules={[Pagination, Mousewheel, Navigation]}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            className={styles.study_swiper}
          >
            <SwiperSlide
              className={styles.swiper__slide}
              onClick={clickHandler}
            >
              Slide 1
            </SwiperSlide>
          </Swiper>
        </div>
      ))}
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