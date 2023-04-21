import styles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import ContainerBase from "@/components/ContainerBase";
import { Button } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";
import EvaluationCheck from "@/components/EvaluationCheck";

export default function FormApplicationManager(props: any) {
  const [applicant, setApplicant] = useState<any>(undefined);
  const [studyProgram, setStudyProgram] = useState<any>(undefined);
  const [evaluations, setEvaluations] = useState<any>();
  const [relevantSTud, setRelevantStud] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string>();

  async function changeStatus(status: number) {
    const { error } = await supabase
      .from("applications")
      .update({ status: status, feedback: feedback })
      .eq("id", applicant?.id);

    if (error) {
      alert(error);
    } else window.location.reload();
  }

  async function getEvaluations() {
    let { data: evaluations, error } = await supabase
      .from("evaluations")
      .select("id, name,study_names, required_knowledge");

    if (error) {
      alert(error);
    } else setEvaluations(evaluations);
  }

  function getRelEvalutations() {
    if (evaluations) {
      evaluations.map((eva: any) =>
        eva.study_names.map((nameNumber: any) =>
          nameNumber == applicant.studyName
            ? setRelevantStud((relevantSTud) => [...relevantSTud, eva])
            : ""
        )
      );
    }
  }

  useEffect(() => {
    setApplicant(props.applications);
    setStudyProgram(props.studyPrograms);
    getEvaluations();
  }, [props]);

  useEffect(() => {
    getRelEvalutations();
  }, [evaluations && applicant]);

  return (
    <>
      {applicant && (
        <div>
          <h1 className="primary">
            {applicant.firstname} {applicant.name}
          </h1>
          <h2> {studyProgram.specialization}</h2>
          <div className={styles.col__two}>
            <div className={styles.item}>
              <form>
                <label>
                  telefone
                  <input readOnly value={applicant.telefone} />
                </label>
                <label>
                  email
                  <input readOnly value={applicant.email} />
                </label>
              </form>
            </div>

            <ContainerBase>
              <h3>Evaluationsbögen</h3>
              {relevantSTud?.map((evaluation: any) => (
                <EvaluationCheck
                  key={evaluation.id}
                  name={evaluation.name}
                  evaluation={relevantSTud}
                  rate={evaluation.required_knowledge}
                />
              ))}

              <label>
                Feedback
                <textarea
                  rows={4}
                  value={feedback}
                  id="description"
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </label>

              {studyProgram.active ? (
                <Button variant={"contained"} onClick={() => changeStatus(3)}>
                  Bewerbung annehmen
                </Button>
              ) : (
                <p> Der Studiengang ist deaktiviert</p>
              )}
              <Button variant={"outlined"} onClick={() => changeStatus(4)}>
                Bewerbung ablehnen
              </Button>
            </ContainerBase>
          </div>
        </div>
      )}
    </>
  );
}
