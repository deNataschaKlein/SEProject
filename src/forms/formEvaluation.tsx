import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { Slider, Button } from "@mui/material";
import { toast } from "react-toastify";
import PillCheckbox from "@/components/PillCheckbox";

export default function FormStudyProgram(props: any) {
  const [current, setCurrent] = useState<any | undefined>(undefined); // value if clicked existing Study

  //Values from Input-fields
  const [studyNames, setStudyNames] = useState<any>();
  const [studyPrograms, setStudyPrograms] = useState<any[]>([]);

  const [studyName, setStudyName] = useState();

  const [evaluationName, setEvaluationName] = useState<string | undefined>(
    undefined
  );

  const [reqKnowledge, setReqKnowledge] = useState(0);

  function postData() {
    if (current == undefined) {
      insertData();
    } else updateData();
  }

  async function updateData() {
    const study_name = studyName;
    const currentId = current?.id;

    const { error } = await supabase
      .from("study_programs")
      .update([{ study_name, evaluationName }])
      .eq("id", currentId);

    if (error) {
      alert(error);
    }
  }

  async function insertData() {
    let { error } = await supabase.from("evaluations").insert([
      {
        name: evaluationName,
        study_names: studyPrograms,
        required_knowledge: reqKnowledge,
      },
    ]);

    if (error) {
    } else {
      window.location.reload();
    }
  }

  async function getStudyNames() {
    let { data, error } = await supabase.from("study_name").select("*");

    if (data) {
      setStudyNames(data);
    }
    if (error) alert(error);
  }

  const setRelevantStudies = (event: any) => {
    if (event.target.checked) {
      setStudyPrograms([...studyPrograms, event.target.value]);
    } else {
      setStudyPrograms(
        studyPrograms.filter((program) => program !== event.target.value)
      );
    }
  };

  function clickHandler() {
    if (
      reqKnowledge == 0 ||
      evaluationName == undefined ||
      studyPrograms.length == 0
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

  function handleRangeSlider(event: any, value: any) {
    setReqKnowledge(value);
  }

  useEffect(() => {
    if (props.current) {
      setCurrent(props.current);
      setEvaluationName(props.current.specialization);
      setStudyName(props.current.study_name);
    }
  }, [props]);

  useEffect(() => {
    getStudyNames();
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
            {studyNames?.map((study: any, _index: any) => (
              <PillCheckbox
                key={study.id}
                label={study.name}
                id={study.id}
                value={study.id}
                onClick={setRelevantStudies}
              />
            ))}
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
          max={5}
          onChange={handleRangeSlider}
        />
        <Button onClick={clickHandler}> Evaluationsbogen hinzufügen</Button>
      </div>
    </form>
  );
}
