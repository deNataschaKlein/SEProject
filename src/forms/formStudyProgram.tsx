import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { FormControlLabel, Switch } from "@mui/material";

export default function FormStudyProgram(props: any) {
  const [current, setCurrent] = useState<any | undefined>(); // value if clicked existing Study
  const [studyProgramNames, setStudyProgramNames] = useState<any[] | undefined>(
    undefined
  ); // Wirtschaftsinformatik, Angwandte Informatik, BWL
  const [studyDegree, setStudyDegree] = useState<any | undefined>();

  const [active, setActive] = useState(true);
  const labelSwitch = active
    ? "Studiengang deaktivieren"
    : "Studiengang aktivieren";

  //Values from Input-fields
  const [studyName, setStudyName] = useState<string | undefined>();
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);
  const [degree, setDegree] = useState<any | undefined>();

  let defaultStudyName: any;

  if (current) {
    defaultStudyName =
      studyProgramNames != undefined
        ? studyProgramNames.find((name: any) => name.id == current.study_name)
        : undefined;
  }

  const handleSwitch = () => {
    setActive(!active);
  };

  async function getStudyNames() {
    let { data: study_name } = await supabase.from("study_name").select();

    if (study_name) {
      setStudyProgramNames(study_name);
    }
  }

  function postData() {
    if (current == undefined) {
      insertData();
    } else {
      updateData();
    }
  }

  async function updateData() {
    const currentId = current?.id;

    const { error } = await supabase
      .from("study_programs")
      .update([
        {
          study_name: studyName,
          specialization,
          active,
          description,
          date,
          study_degree: degree,
        },
      ])
      .eq("id", currentId.toString());

    if (error) {
      alert(error);
    }
  }
  async function insertData() {
    let { error } = await supabase.from("study_programs").insert([
      {
        study_name: studyName,
        specialization,
        active,
        description,
        date,
        study_degree: degree,
      },
    ]);

    if (error) {
    } else {
      window.location.reload();
    }
  }

  async function getDegrees() {
    let { data: study_degrees, error } = await supabase
      .from("study_degrees")
      .select("*");

    setStudyDegree(study_degrees);
  }

  useEffect(() => {
    void getStudyNames();
    void getDegrees();
    if (props.current) {
      setCurrent(props.current);
      setSpecialization(props.current.specialization);
      setActive(props.current.active);
      setStudyName(props.current.study_name);
      setDegree(props.current.degree);
      setDescription(props.current.description);
      setDate(props.current.date);
    }
  }, [props]);

  return (
    <form className={styles.col__two} onSubmit={postData}>
      <div className={styles.item}>
        <label>
          Studiengang
          <select onChange={(e) => setStudyName(e.target.value)}>
            <option value="none" selected disabled hidden />
            {studyProgramNames?.map((studyName, _index) => (
              <option
                key={studyName.id}
                value={studyName.id}
                selected={
                  current ? current.study_name == studyName.id : undefined
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
        <label>
          Startdatum
          <input
            type={"date"}
            value={date}
            id="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Beschreibung
          <textarea
            rows={5}
            value={description}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Abschlussart
          <select onChange={(e) => setDegree(e.target.value)}>
            <option value="none" selected disabled hidden />
            {studyDegree?.map((degree: any, _index: any) => (
              <option
                key={degree.id}
                value={degree.id}
                selected={
                  current ? current.study_degree == degree.id : undefined
                }
              >
                {degree.name}
              </option>
            ))}
          </select>
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
