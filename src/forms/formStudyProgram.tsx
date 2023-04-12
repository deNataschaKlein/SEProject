import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { FormControlLabel, Switch } from "@mui/material";

export default function FormStudyProgram(props) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [name, setName] = useState("Wirtschaftsinformatik");
  const [specialization, setSpecialization] = useState("");
  const [active, setActive] = useState(true);
  const labelSwitch = "Studiengang aktivieren";

  function removeDuplicatesByKey(array, key) {
    return array.reduce((accumulator, currentValue) => {
      if (!accumulator.find((obj) => obj[key] === currentValue[key])) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
  }

  async function getStudyPrograms() {
    let { data: study_programs } = await supabase
      .from("study_programs")
      .select("*");

    const resultArray = removeDuplicatesByKey(study_programs, "name");
    setPrograms(resultArray);
  }

  const handleSwitch = () => {
    setActive(!active);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!specialization || !name) {
      return;
    }

    props.onSubmit(name, specialization, active);
  };

  useEffect(() => {
    getStudyPrograms();
    setName(props.current.name);
    setSpecialization(props.current.specialization);
    setActive(props.current.active);
  }, []);

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
            name="options"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {programs.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Schwerpunkt
          <input
            className={styles.button}
            type="text"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </label>
        <FormControlLabel
          control={<Switch checked={active} onChange={handleSwitch} />}
          label={labelSwitch}
        />
        {/*<label>
          Studientyp
          <select
            name="studyType"
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
          >
            <option value="dual">Dual</option>
            <option value="berufsbegleitend">Berufsbegleitend</option>
          </select>
        </label>*/}
        <input type="submit" value="Submit" />
      </div>

      <div>Evaluierungsbögen</div>
    </form>
  );
}
