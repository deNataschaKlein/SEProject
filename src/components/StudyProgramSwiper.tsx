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
import StudyPrograms from "@/pages/studyPrograms/studyPrograms";

export default function StudyProgramSwiper({ setStudyModal }) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [specializationsWi, setSpecializationsWi] = useState<any[]>([]);
  const [specializationsAi, setSpecializationsAi] = useState<any[]>([]);
  const [specializationsBwl, setSpecializationsBwl] = useState<any[]>([]);

  

  const spezes = ["Wirtschaftsinformatik", "Angewandte Informatik", "Betriebswirtschaftslehre"]

  
  async function getFilteredStudyPrograms() {
  
    for (let i of spezes){
      let {data: study_programs} = await supabase
        .from("study_programs")
        .select("*")
        .filter("name", "in", (spezes[0]))
        .filter("degree", "in", "(1,2,3)");

      return(study_programs);
    }
  }




  async function getSpecializationsWi() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      //.eq("name",spezes[0])
      .eq("degree", 2);

      setSpecializationsWi(study_programs);
  }

  async function getSpecializationsAi() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("name",spezes[1]);
      setSpecializationsAi(study_programs);
  }

  async function getSpecializationBwl() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("name",spezes[2]);
      setSpecializationsBwl(study_programs);
  }

  useEffect(() => {
    getSpecializationsWi();
    getSpecializationsAi();
    getSpecializationBwl();
    getFilteredStudyPrograms();
  }, []);

  function clickHandler() {
    setStudyModal(true);
  }

  return (
    <>
        <div className={styles.swiperbox} >
          <h2 className="primary">Wirtschaftsinformatik</h2>
          <Swiper
            breakpoints={{
              490: {
                width: 480,
                slidesPerView: 2,
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
            {
              specializationsWi.map((program, _index) => (
               <SwiperSlide className={styles.swiper__slide} onClick={clickHandler} key={_index}>
                 {program.specialization}
                </SwiperSlide>
               ))
            }    
          </Swiper>
        </div>
      
        <div className={styles.swiperbox} >
          <h2 className="primary">Betriebswirtschaftslehre</h2>
          <Swiper
            breakpoints={{
              490: {
                width: 480,
                slidesPerView: 2,
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

            {
              specializationsBwl.map((program, _index) => (
               <SwiperSlide className={styles.swiper__slide} onClick={clickHandler} key={_index}>
                 {program.specialization}
                </SwiperSlide>
               ))
            } 
            
          </Swiper>
        </div>
      
        <div className={styles.swiperbox} >
          <h2 className="primary">Angewandte Informatik</h2>
          <Swiper
            breakpoints={{
              490: {
                width: 480,
                slidesPerView: 2,
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
            {
              specializationsAi.map((program, _index) => (
               <SwiperSlide className={styles.swiper__slide} onClick={clickHandler} key={_index}>
                 {program.specialization}
                </SwiperSlide>
               ))
            } 
            
          </Swiper>
        </div>
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