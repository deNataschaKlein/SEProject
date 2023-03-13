import { supabase } from "../../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "./studyPrograms.module.css";
import StudyProgramSwiper from "../../components/StudyProgramSwiper";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import FormStudyProgram from "../../forms/formStudyProgram";
import PillCheckbox from "@/components/PillCheckbox";

function StudyPrograms(this: any) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [studyModal, setStudyModal] = useState(false);
  const [name, setName] = useState("");
  const [studies, setStudies] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [programWI, setProgramWI] = useState<any[]>([]);
  const [programBWL, setProgramBWL] = useState<any[]>([]);
  const [programAI, setProgramAI] = useState<any[]>([]);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
/*  const degree = ["bachelor", "master"]*/

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");
    setPrograms(study_programs);
  }

  async function getStudyProgramWI() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .in("name", ["Wirtschaftsinformatik"])
      .eq("id", 1);
    setProgramWI(study_programs);
  }

  async function getStudyProgramBWL() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .in("name", ["Betriebswirtschaftslehre"])
      .eq("id", 2);
    setProgramBWL(study_programs);
  }

  async function getStudyProgramAI() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*")
      .in("name", ["Angewandte Informatik"])
      .eq("id", 3);
    setProgramAI(study_programs);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!specialization || !name) {
      setFormError("❌ Bitte gebe einen Studiengang an!");
      return;
    }

    let { data: study_programs, error } = await supabase
      .from("study_programs")
      .insert([studies]);

    if (error) {
      console.log(error);
      setFormError("❌ Bitte gebe einen Studiengang an!");
    }
    if (specialization && name) {
      console.log(study_programs);
      setFormSuccess("✅ Studiengang angelegt");
    }
  };

  useEffect(() => {
    getStudyPrograms();
    getStudyProgramWI();
    getStudyProgramBWL();
    getStudyProgramAI();
  }, []);

  const addStudy = (study) => {
    let studyProgram = [...studies, study];
    setStudies(studyProgram);
    console.log(studies);
  };

  function ModalclickHandler() {
    setStudyModal(true);
  }

  /*function filterFunction(degree: string){
    //const [programs, setPrograms] = useState<any[]>([]);
    let deg: number;

    if (degree = "bachelor"){
      deg = 1;
    }
    else if (degree = "master"){
      deg = 2;
    }

    async function getStudyPrograms() {
      let { data: study_programs } = await supabase
        .from("study_programs")
        .select("*")
        .eq("study_degree", deg);
      //.filter("study_degree", "in", deg);

      setPrograms(study_programs);
    }

    useEffect(() => {
      getStudyPrograms();
    }, []);

    return programs;
  }*/

  if (programs) {
    return (
      <>
        <h1>Studiengänge</h1>
        <button className="button--primary" onClick={ModalclickHandler}>
          Neuen Studiengang hinzufügen
        </button>
        {studyModal && (
          <ModalOffCanvas
            button="yes"
            headline={"Neuen Studiengang hinzufügen"}
            setModal={setStudyModal}
          >
            <FormStudyProgram addStudy={addStudy} />
          </ModalOffCanvas>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className={styles.submitInput}
              type="text"
              id="specialization"
              placeholder="Spezialisierung Studiengang hinzufügen"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </label>
          <label>
            {programWI.map((program) => (
              <>
                <p>{program.name}</p>
                <input
                  type="radio"
                  id="2"
                  name="options"
                  value={program.name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </>
            ))}
          </label>
          <label>
            {programBWL.map((program, index) => (
              <>
                <p>{program.name}</p>
                <input
                  type="radio"
                  id="2"
                  name="options"
                  key={index}
                  value={program.name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </>
            ))}
          </label>
          <label>
            {programAI.map((program, index) => (
              <>
                <p>{program.name}</p>
                <input
                  type="radio"
                  id="3"
                  name="options"
                  key={index}
                  value={program.name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </>
            ))}
          </label>
          <button className={styles.submitButton}>Anlegen</button>
          {formError && <p className="error">{formError}</p>}
          <p>{formSuccess}</p>
        </form>

        <div className={styles.studyProgram}>
          <div className={styles.studyProgram__swipersection}>
            <StudyProgramSwiper
              programs={programs}
              setStudyModal={setStudyModal}
            />
          </div>
          <div className={styles.studyProgram__filter}>
            <form>
              <PillCheckbox label={"Bachelor"} id="bachelor" name="degree" checked={false}/>
              <PillCheckbox label={"Master"} id="master" name="degree" checked={false} />
              <PillCheckbox label={"Promotion"} id="promotion" name="degree" checked={false}/>

              <PillCheckbox label={"dual"} id="dual" name="studyType" checked={false}/>
              <PillCheckbox label={"berufsbegleitend"} id="berufsbegleitend" name="studyType" checked={false}/>
              <PillCheckbox label={"vollzeit"} id="vollzeit" name="studyType" checked={false}/>
              <PillCheckbox label={"verkürzt"} id="verkürzt" name="studyType" checked={false}/>

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
}

export default StudyPrograms;
