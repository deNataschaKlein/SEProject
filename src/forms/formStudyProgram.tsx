import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";

export default function FormStudyProgram({ addStudy }) {
  const [studyProgram, setStudyProgram] = useState("");
  const [studyType, setStudyType] = useState("");

  const [programs, setPrograms] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [programWI, setProgramWI] = useState<any[]>([]);
  const [programBWL, setProgramBWL] = useState<any[]>([]);
  const [programAI, setProgramAI] = useState<any[]>([]);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

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
      .insert([{ name, specialization }]);

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

  /*
    const handleSubmit = (e) => {
    addStudy([{ studyProgram, specialization, studyType }]);
    e.preventDefault();
  };
  */

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          className={styles.button}
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
      <button onSubmit={handleSubmit} className={styles.form__submitButton}>Anlegen</button>
      {formError && <p className="error">{formError}</p>}
      <p>{formSuccess}</p>
    </form>

    /*
    <form
      className={styles.col__two}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className={styles.item}>
        <label>
          Studiengang
          <select
            name="studyProgram"
            value={studyProgram}
            onChange={(e) => setStudyProgram(e.target.value)}
          >
            <option value="wirtschaftsinformatik">Wirtschaftsinformatik</option>
            <option value="bwl">Betriebswirtschaftslehre</option>
            <option value="aif">Angewandte Informatik</option>
          </select>
        </label>
        <label>
          Schwerpunkt
          <input
            className={styles.input}
            type="text"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialisation(e.target.value)}
          />
        </label>
        <label>
          Studientyp
          <select
            name="studyType"
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
          >
            <option value="dual">Dual</option>
            <option value="berufsbegleitend">Berufsbegleitend</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </div>

      <div>Evaluierungsbögen</div>
    </form>
    */
  );
}
