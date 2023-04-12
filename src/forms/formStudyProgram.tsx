import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { FormControlLabel, Switch } from "@mui/material";

export default function FormStudyProgram(props: any) {
  const [current, setCurrent] = useState<any[]>(undefined); // value if clicked existing Study
  const [studyProgramNames, setStudyProgramNames] = useState([]); // Wirtschaftsinformatik, Angwandte Informatik, BWL

  const [active, setActive] = useState(true);
  const labelSwitch = active
    ? "Studiengang deaktivieren"
    : "Studiengang aktivieren";

  //Values from Input-fields
  const [studyName, setStudyName] = useState();
  const [specialization, setSpecialization] = useState("");

  let defaultStudyName: undefined;

  if (current) {
    defaultStudyName = studyProgramNames.find(
      (name) => name.id == current.study_name
    );
  }

  const handleSwitch = () => {
    setActive(!active);
  };

  async function getStudyNames() {
    let { data: study_name, error } = await supabase
      .from("study_name")
      .select();

    setStudyProgramNames(study_name);
  }

  function postData() {
    if (current == undefined) {
      insertData();
    } else updateData();
  }

  async function updateData() {
    const study_name = studyName;
    const currentId = current.id;

    const { error } = await supabase
      .from("study_programs")
      .update([{ study_name, specialization, active }])
      .eq("id", currentId);

    if (error) {
      debugger;
    } else {
    }
  }
  async function insertData() {
    let { error } = await supabase
      .from("study_programs")
      .insert([{ study_name: studyName, specialization, active }]);

    if (error) {
    } else {
      window.location.reload();
    }
  }

  useEffect(() => {
    getStudyNames();
    if (props.current) {
      setCurrent(props.current);
      setSpecialization(props.current.specialization);
      setActive(props.current.active);
      setStudyName(props.current.study_name);
    }
  }, []);

  return (
    <form className={styles.col__two} onSubmit={postData}>
      <div className={styles.item}>
        <label>
          Studiengang
          <select onChange={(e) => setStudyName(e.target.value)}>
            {studyProgramNames.map((studyName, _index) => (
              <option
                key={studyName.id}
                value={studyName.id}
                selected={
                  defaultStudyName ? defaultStudyName.id == studyName.id : ""
                }
              >
                {studyName.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Schwerpunkt
          <input
            type={"text"}
            value={specialization}
            id="specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </label>
        <FormControlLabel
          control={<Switch checked={active} onChange={handleSwitch} />}
          label={labelSwitch}
        />
        <input type={"submit"} value={"bearbeiten speichern"} />
      </div>
    </form>
  );
}
