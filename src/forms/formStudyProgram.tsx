import React, { useState } from "react";
import styles from "../styles/Form.module.css";

export default function FormStudyProgram({ addStudy }) {
  const [studyProgram, setStudyProgram] = useState("");
  const [specialization, setSpecialisation] = useState("");
  const [studyType, setStudyType] = useState("");

  const handleSubmit = (e) => {
    addStudy([{ studyProgram, specialization, studyType }]);
    e.preventDefault();
  };

  return (
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
  );
}
