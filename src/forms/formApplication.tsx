import styles from "../styles/Form.module.css";
import ContainerBase from "@/components/ContainerBase";
import { Button } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function FormApplication(props: any) {
  const employee = props.employee;
  const studyNames = props.studyNames; //BWL, Wirtschaftsinformatik, Angewandte Informatik
  const studyPrograms = props.studyPrograms; // Software Engineering, IT-Consulting,....
  const [studyName, setStudyName] = useState(""); //Value zum schicken der Bewerbung
  const [studySpecial, setStudySpecial] = useState(); //Spezialisierung gefiltert

  let application = {
    name: "",
    firstname: "",
    address: "",
    telefone: "",
    email: "",
  };
  if (props.applications) {
    application = props.applications;
  }

  async function getStudyName() {
    let { data: study_name, error } = await supabase
      .from("study_name")
      .select()
      .eq("id", studyPrograms.study_name);

    setStudyName(study_name);
  }

  async function changeStatus(status: number) {
    const { error } = await supabase
      .from("applications")
      .update({ status: status })
      .eq("id", application.id);

    window.location.reload();
  }

  function changeValues() {
    const nameID = studyNames.find((element) => element.name === studyName);

    if (nameID) {
      const findSpecial = studyPrograms.filter(
        (element) => element.study_name === nameID.id
      );

      setStudySpecial(findSpecial);
    }
  }

  if (studyNames) {
    useEffect(() => {
      changeValues();
    }, [studyName]);
  } else {
    useEffect(() => {
      getStudyName();
    }, []);
  }

  return (
    <div>
      <h1 className={"primary"}>
        {" "}
        {application.firstname + " " + application.name}
      </h1>
      {application && (
        <form className={styles.col__two}>
          <div>
            <div className={styles.item__space}>
              <h2>Studium</h2>
              <label>
                Studienang
                {studyNames ? (
                  <select
                    name={"StudyProgramName"}
                    onChange={(e) => setStudyName(e.target.value)}
                  >
                    {studyNames.map((name, _index) => (
                      <option key={name.id} value={name.name}>
                        {name.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input type={"text"} value={studyName[0]?.name} readOnly />
                )}
              </label>

              {/*Schwerpunkt*/}
              <label>
                Schwerpunkt
                {studySpecial ? (
                  <select>
                    {studySpecial.map((special, _index) => (
                      <option value={special.specialization} key={special.id}>
                        {special.specialization}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={"text"}
                    readOnly
                    value={studyPrograms.specialization}
                  />
                )}
              </label>
            </div>

            <div>
              <h2>Informationen</h2>
              {!employee && (
                <div>
                  <label>
                    Vorname
                    <input type={"text"} />
                  </label>
                  <label>
                    Nachname
                    <input type={"text"} />
                  </label>
                </div>
              )}

              <label>
                Adresse
                <input
                  type={"text"}
                  value={application.address}
                  readOnly={employee}
                />
              </label>
              <label>
                Telefon
                <input
                  type={"text"}
                  value={application.telefone}
                  readOnly={employee}
                />
              </label>
              <label>
                E-Mail Adresse
                <input
                  type={"text"}
                  value={application.email}
                  readOnly={employee}
                />
              </label>
            </div>
          </div>
          {props.employee && (
            <div>
              <ContainerBase>
                Ein Bild
                <Button variant={"contained"} onClick={() => changeStatus(3)}>
                  Bewerbung annehmen
                </Button>
                <Button variant={"outlined"} onClick={() => changeStatus(4)}>
                  Bewerbung ablehnen
                </Button>
              </ContainerBase>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
