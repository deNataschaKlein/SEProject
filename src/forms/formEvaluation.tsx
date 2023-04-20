import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { Slider, Button, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";

export default function FormStudyProgram(props: any) {
  const [current, setCurrent] = useState<any[]>(undefined); // value if clicked existing Study
  const [studyProgramNames, setStudyProgramNames] = useState([]); // Wirtschaftsinformatik, Angwandte Informatik, BWL

  //Values from Input-fields
  const [studyName, setStudyName] = useState();
  const [evaluationName, setEvaluationName] = useState("");
  const [forWi, setforWi] = React.useState(false);
  const [forBwl, setforBwl] = React.useState(false);
  const [forAi, setforAi] = React.useState(false);
  const [reqKnowledge, setReqKnowledge] = useState(0);
  const [forWi1, setforWi1] = useState(null);
  const [forBwl1, setforBwl1] = useState(null);
  const [forAi1, setforAi1] = useState(null);

  let defaultStudyName: undefined;

  if (current) {
    defaultStudyName = studyProgramNames.find(
      (name) => name.id == current.study_name
    );
  }

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
      .update([{ study_name, evaluationName }])
      .eq("id", currentId);

    if (error) {
      debugger;
    } else {
    }
  }
  async function insertData() {
    let { error } = await supabase.from("evaluations").insert([
      {
        name: evaluationName,
        studyname1_id: forWi1,
        studyname2_id: forBwl1,
        studyname3_id: forAi1,
        required_knowledge: reqKnowledge,
      },
    ]);

    if (error) {
    } else {
      window.location.reload();
    }
  }

  function clickHandler() {
    if (
      reqKnowledge.length == 0 ||
      evaluationName.length == 0 ||
      (forWi == false && forBwl == false && forAi == false)
    ) {
      toast(
        "Bitte alle Felder ausfüllen und die Kenntnisstandanforderung setzen!",
        { hideProgressBar: true, autoClose: 5000, type: "warning" }
      );
    } else {
      postData();
      toast("Evaluationsbogen hinzugefügt", {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
      });
    }
  }

  function activeHandlerWi(e) {
    setforWi(e.target.checked);
    if (forWi1 != 1) {
      setforWi1(1);
    } else {
      setforWi1(null);
    }
    console.log(forWi1);
  }

  function activeHandlerBwl(e) {
    setforBwl(e.target.checked);
    if (forBwl1 != 2) {
      setforBwl1(2);
    } else {
      setforBwl1(null);
    }
    console.log(" der quatsch kommt " + forBwl1);
  }

  function activeHandlerAi(e) {
    setforAi(e.target.checked);

    if (forAi1 != 3) {
      setforAi1(3);
    } else {
      setforAi1(null);
    }
    console.log(" der quatsch kommt " + forAi1);
  }

  function handleRangeSlider(event, value) {
    setReqKnowledge(value);
  }

  useEffect(() => {
    getStudyNames();
    if (props.current) {
      setCurrent(props.current);
      setEvaluationName(props.current.specialization);
      setStudyName(props.current.study_name);
    }
  }, []);

  useEffect(() => {
    setEvaluationName(props.editEvaluation.name);
    setReqKnowledge(props.editEvaluation.required_knowledge);
    if (props.editEvaluation.studyname1_id) {
      setforWi(true);
    }
    if (props.editEvaluation.studyname2_id) {
      setforBwl(true);
    }
    if (props.editEvaluation.studyname3_id) {
      setforAi(true);
    }
  }, []);

  return (
    <form className={styles.col__two}>
      <div className={styles.item}>
        <label>
          Name
          <input
            type={"text"}
            value={evaluationName}
            id="evaluationName"
            onChange={(e) => setEvaluationName(e.target.value)}
          />
        </label>

        <label>
          Relevant für
          <div>
            <FormControlLabel
              label="Wirtschaftsinformatik"
              control={
                <Checkbox
                  key={Math.random()}
                  onChange={activeHandlerWi}
                  checked={forWi}
                />
              }
            />

            <FormControlLabel
              label="Betriebswirtschaftslehre"
              control={
                <Checkbox
                  key={Math.random()}
                  onChange={activeHandlerBwl}
                  checked={forBwl}
                />
              }
            />

            <FormControlLabel
              label="Angewandte Informatik"
              control={
                <Checkbox
                  key={Math.random()}
                  onChange={activeHandlerAi}
                  checked={forAi}
                />
              }
            />
          </div>
        </label>

        <label>Kenntnisstandanforderung</label>
        <Slider
          aria-label="Requirements"
          value={reqKnowledge}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
          onChange={handleRangeSlider}
        />
        <Button variant="undefined" onClick={clickHandler}>
          {" "}
          Evaluationsbogen hinzufügen
        </Button>
      </div>
    </form>
  );
}
