import { NextPage } from "next";
import styles from "./evaluations.module.css";
import BoxEvaluations from "@/components/BoxEvaluations";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "@mui/material";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import ContainerBase from "@/components/ContainerBase";
import ChipHeadline from "@/components/ChipHeadline";
import FormEvaluation from "@/forms/formEvaluation";

const Applications: NextPage = () => {
  const [studyPrograms, setStudyPrograms] = useState<any[]>([]);
  const [editEvaluation, seteditEvaluation] = useState<any[]>([]);
  const [evaluationModal, setEvaluationModal] = useState(false);

  //ab hier const für evaluations
  const [evaluations, setEvaluations] = useState<any[]>([]);

  const [study_names, setStudyNames] = useState<any[]>([]);


  //ab hier getter für evaluations
  async function getEvaluations() {
    try {
      let { data: evaluations, error } = await supabase
        .from("evaluations")
        .select("*");
      if (evaluations) {
        setEvaluations(evaluations);
      }

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  async function getStudyNames() {
    try {
      let { data: study_names, error } = await supabase
        .from("study_name")
        .select("*");
      if (study_names) {
        setStudyNames(study_names);
      }

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getEvaluations();
    getStudyNames();
  }, []);

  function editEval(event, evaluation: Object[]) {
    if (event.target.tagName !== "BUTTON") {
      setEvaluationModal(true);
      seteditEvaluation(evaluation);
    }
  }

  function getStudyProgram(application: any) {
    const StudyProgram = studyPrograms.find(
      (program) => program.id == application.study_programs
    );
    if (StudyProgram) {
      return StudyProgram;
    }
  }

  function showEvaluation(evaluation: Object[]) {
    seteditEvaluation(evaluation);

    setEvaluationModal(true);
  }

  function handleDelete(event, evaluation) {
    setEvaluationModal(false);

    supabase
      .from("evaluations")
      .delete()
      .eq("id", evaluation.id)
      .then((result) => {
        getEvaluations();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h1>Evaluationsbögen verwalten</h1>
      <div className={styles.applications}>
        {/*Incoming Applications*/}
        <div>
          <ChipHeadline
            label={"Evaluationsbögen"}
            number={evaluations.length.toString()}
          />
          <ContainerBase>
            {evaluations.map((evaluation, _index) => {
              return (
                <div
                  onClick={(event) => editEval(event, evaluation)}
                  key={evaluation.id}
                >
                  <BoxEvaluations
                    handleDelete={(event) => handleDelete(event, evaluation)}
                    name={evaluation.name}
                    studyname1_id={
                      study_names[evaluation.studyname1_id - 1]?.name
                    }
                    studyname2_id={
                      study_names[evaluation.studyname2_id - 1]?.name
                    }
                    studyname3_id={
                      study_names[evaluation.studyname3_id - 1]?.name
                    }
                  />
                </div>
              );
            })}
          </ContainerBase>
        </div>

        <Button
          variant={"contained"}
          onClick={() => showEvaluation(evaluations)}
        >
          Evaluationsbogen erstellen
        </Button>
      </div>
      {/*Modal to show up details of an evaluation*/}
      {evaluationModal && (
        <ModalOffCanvas setModal={setEvaluationModal}>
          <FormEvaluation
            applications={editEvaluation}
            studyPrograms={getStudyProgram(editEvaluation)}
            editEvaluation={editEvaluation}
          />
        </ModalOffCanvas>
      )}
    </>
  );
};

export default Applications;