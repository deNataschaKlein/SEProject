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
  const [filteredstudySpecial, setFilteredStudySpecial] = useState(); //Spezialisierung gefiltert

  // data  for sending new Applicant
  const [study_programs, setStudy_programs] = useState("");
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState();

  let application = {
    firstname: firstname,
    name: name,
    study_programs: study_programs,
    birth: birth,
    address: address,
    telefone: telefone,
    email: email,
    status: 1,
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

      const filterActive = findSpecial.filter(
        (element) => element.active === true
      );

      setFilteredStudySpecial(filterActive);
    }
  }

  async function sendApplication() {
    const { error } = await supabase.from("applications").insert({
      firstname,
      name,
      study_programs: study_programs,
      birth,
      address,
      telefone,
      email,
      status: 1,
    });

    if (error) {
    } else window.location.reload();
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
      {employee && (
        <h1 className={"primary"}>
          {application.firstname + " " + application.name}
        </h1>
      )}
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
                    <option value="none" selected disabled hidden />
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
                {filteredstudySpecial ? (
                  <select
                    name={"studyProgramSpecialization"}
                    onChange={(e) => setStudy_programs(e.target.value)}
                  >
                    <option value="none" selected disabled hidden />
                    {filteredstudySpecial.map((special, _index) => (
                      <option value={special.id} key={special.id}>
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
                    <input
                      type={"text"}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </label>
                  <label>
                    Nachname
                    <input
                      type={"text"}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
              )}
              <label>
                Geburtstag
                <input
                  defaultValue={application.birth}
                  type={"date"}
                  onChange={(e) => setBirth(e.target.value)}
                />
              </label>

              <label>
                Adresse
                <input
                  type={"text"}
                  defaultValue={application.address}
                  onChange={(e) => setAddress(e.target.value)}
                  readOnly={employee}
                />
              </label>
              <label>
                Telefon
                <input
                  type={"text"}
                  defaultValue={application.telefone}
                  readOnly={employee}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </label>
              <label>
                E-Mail Adresse
                <input
                  type={"text"}
                  defaultValue={application.email}
                  readOnly={employee}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            {!employee && (
              <Button variant={"contained"} onClick={() => sendApplication()}>
                Bewerbung senden
              </Button>
            )}
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
