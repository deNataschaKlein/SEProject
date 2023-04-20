import { NextPage } from "next";
import styles from "./evaluations.module.css";
import BoxEvaluations from "@/components/BoxEvaluations";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Box, Button, Modal } from "@mui/material";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import FormApplication from "@/forms/formApplication";
import ContainerBase from "@/components/ContainerBase";
import ChipHeadline from "@/components/ChipHeadline";
import FormEvaluation from "@/forms/formEvaluation";
import StudyPrograms from "../studyPrograms";
import StudyProgramSwiper from "@/components/StudyProgramSwiper";

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [studyPrograms, setStudyPrograms] = useState<any[]>([]);
  const [editEvaluation, seteditEvaluation] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [evaluationModal, setEvaluationModal] = useState(false);
  const [employee, setEmployee] = useState(true);

  //ab hier const für evaluations
  const [evaluations, setEvaluations] = useState<any[]>([]);

  const [study_names, setStudyNames] = useState<any[]>([]);

  const handleClose = () => setOpen(false);

  //Load Applications
  async function getApplications() {
    try {
      let { data: applications, error } = await supabase
        .from("applications")
        .select("*");
      if (applications) {
        setApplications(applications);
      }

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }

  async function getStudyPrograms() {
    try {
      let { data: study_programs, error } = await supabase
        .from("study_programs")
        .select("*");

      if (study_programs) {
        setStudyPrograms(study_programs);
      }
      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  //ab hier getter für evaluations
  async function getEvaluations() {
    try {
      let { data: evaluations, error } = await supabase
        .from("evaluations")
        .select("*");
      if (evaluations) {
        console.log("eee", evaluations);
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
        console.log("study", study_names);
        setStudyNames(study_names);
      }

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  function getStudyName(evaluationStudyProgram: any) {
    const StudyProgramName = studyPrograms.find(
      (program) => program.id == evaluationStudyProgram
    );
    if (StudyProgramName) {
      console.log(StudyProgramName);
      return StudyProgramName.name;
    }
  }

  useEffect(() => {
    getApplications();
    getStudyPrograms();
    getEvaluations();
    getStudyNames();
  }, []);

  function editEval(event, evaluation: Object[]) {
    if (event.target.tagName !== "BUTTON") {
      setEvaluationModal(true);
      seteditEvaluation(evaluation);
    }
  }

  async function startEditing() {
    setOpen(true);
  }

  function getSpecialization(applicationStudyProgram) {
    const StudyProgramName = studyPrograms.find(
      (program) => program.id == applicationStudyProgram
    );
    if (StudyProgramName) {
      return StudyProgramName.specialization;
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
            employee={employee}
            editEvaluation={editEvaluation}
          />
        </ModalOffCanvas>
      )}
    </>
  );
};

export default Applications;
