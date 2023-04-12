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

export default function StudyProgramSwiper({ setStudyModal }: any) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [specializationsWi, setSpecializationsWi] = useState<any[]>([]);
  const [specializationsAi, setSpecializationsAi] = useState<any[]>([]);
  const [specializationsBwl, setSpecializationsBwl] = useState<any[]>([]);
  const [deactivated, setDeactivated] = useState<any[]>([]);

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");

    setPrograms(study_programs);
  }

  async function getSpecializationsWi() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("name", "Wirtschaftsinformatik");
    setSpecializationsWi(study_programs);
  }

  async function getSpecializationsAi() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("name", "Angewandte Informatik");
    setSpecializationsAi(study_programs);
  }

  async function getSpecializationBwl() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("name", "Betriebswirtschaftslehre");
    setSpecializationsBwl(study_programs);
  }

  async function getDeactivated() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .eq("active", false);
    setDeactivated(study_programs);
  }

  useEffect(() => {
    getStudyPrograms();
    getSpecializationsWi();
    getSpecializationsAi();
    getSpecializationBwl();
    getDeactivated();
  }, []);

  function clickHandler() {
    setStudyModal(true);
  }

  return (
    <>
      <div className={styles.swiperbox}>
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
          {specializationsWi.map((program, _index) => (
            <SwiperSlide
              className={styles.swiper__slide}
              onClick={clickHandler}
              key={_index}
            >
              {program.specialization}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.swiperbox}>
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
          {specializationsBwl.map((program, _index) => (
            <SwiperSlide
              className={styles.swiper__slide}
              onClick={clickHandler}
              key={_index}
            >
              {program.specialization}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.swiperbox}>
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
          {specializationsAi.map((program, _index) => (
            <SwiperSlide
              className={styles.swiper__slide}
              onClick={clickHandler}
              key={_index}
            >
              {program.specialization}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.deactivated}>
        {deactivated.map((program, _index) => (
          <div className={styles.deactivated__object}>
            {program.specialization}
          </div>
        ))}
      </div>
    </>
  );
}
