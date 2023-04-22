import { NextPage } from "next";
import styles from "./evaluations.module.css";
import BoxEvaluations from "@/components/BoxEvaluations";
import React, { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "@mui/material";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import ContainerBase from "@/components/ContainerBase";
import ChipHeadline from "@/components/ChipHeadline";
import FormEvaluation from "@/forms/formEvaluation";

const Evaluations: NextPage = () => {
  const session = useSession();
  const [editEvaluation, seteditEvaluation] = useState<any[]>([]);
  const [evaluationModal, setEvaluationModal] = useState(false);

  //ab hier const für evaluations
  const [evaluations, setEvaluations] = useState<any[]>([]);

  //ab hier getter für evaluations
  async function getEvaluations() {
    let { data: evaluations, error } = await supabase
      .from("evaluations")
      .select("*");
    if (error) {
      alert(error);
    } else {
      if (evaluations) {
        setEvaluations(evaluations);
      }
    }
  }

  function editEval(event: any, evaluation: Object[]) {
    if (event.target.tagName !== "BUTTON") {
      setEvaluationModal(true);
      seteditEvaluation(evaluation);
    }
  }

  function showEvaluation(evaluation: Object[]) {
    seteditEvaluation(evaluation);
    setEvaluationModal(true);
  }

  function handleDelete(event: any, evaluation: any) {
    setEvaluationModal(false);

    supabase
      .from("evaluations")
      .delete()
      .eq("id", evaluation.id)
      .then((result) => {
        getEvaluations();
      });
  }

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <>
    {session ? (
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
                      handleDelete={(event: any) =>
                        handleDelete(event, evaluation)
                      }
                      name={evaluation.name}
                      relevantStudies={evaluation.study_names}
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
            <FormEvaluation editEvaluation={editEvaluation} />
          </ModalOffCanvas>
        )}
      </>
    ) : (
      <>
        <h2>Keine Zugriffsberechtigung!</h2>
        <p>Logge dich ein, wenn du Mitarbeiter:in bist um diese Seite zu sehen.</p>
      </>
    )}
    </>
  );
};

export default Evaluations;
