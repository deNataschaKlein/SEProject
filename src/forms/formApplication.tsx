import styles from "../styles/Form.module.css";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import UploadDocuments from "@/components/UploadDocuments";
import { Button } from "@mui/material";

export default function FormApplication(props: any) {
  const [pdfUrl, setPdfUrl] = useState('')

  const handleUploadSuccess = (fileUrl: string) => {
    setPdfUrl(fileUrl)
  }
  const [studyProgramName, setStudyProgramName] = useState(); // Inhalte aus der Datenbank WI,AI,BWL
  const [study_programsName, setStudyPrograms] = useState(); //ausgewählter Schwerpunkt Name & ID
  const [allStudy_programs, setAllStudy_programs] = useState(undefined);

  const [studyNameID, setStudyNameID] = useState(""); // Studiengang ID zum herausfinden des foreign key
  const [selectedStudyProgram, setSelectedStudyProgram] = useState(undefined); // bei Klick auf einen existierenden Studiengang
  const [specialization, setSpecialization] = useState(undefined); // falls es current gibt

  const [study_programs, setStudy_programs] = useState(undefined); //zu verschickender Study-Program foreign Key
  const [firstname, setFirstname] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [telefone, setTelefone] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  async function getStudyName() {
    let { data: study_name, error } = await supabase
      .from("study_name")
      .select("*");
    setStudyProgramName(study_name);
  }

  async function getStudyPrograms() {
    let { data } = await supabase.from("study_programs").select("*");

    setAllStudy_programs(data);
  }

  function getSpezialization(specialization) {
    let study = allStudy_programs?.find(
      (program) => program.specialization == specialization
    );

    setStudy_programs(study?.id);
  }

  async function postApplication() {
    if (firstname && name && study_programs && email && telefone) {
      const { error } = await supabase.from("applications").insert({
        firstname,
        name,
        study_programs: study_programs,
        email,
        telefone,
        status: 1,
      });

      if (error) {
      } else window.location.reload();
    }
  }

  useEffect(() => {
    getStudyName();
    getStudyPrograms();
    if (props.current) {
      setSelectedStudyProgram(props.current);
      setSpecialization(props.current.specialization);
    }
  }, []);

  useEffect(() => {
    const studiengang = studyProgramName?.find(
      (studyProgram) => studyProgram.id == selectedStudyProgram?.study_name
    );

    if (studiengang) {
      setStudyPrograms(studiengang);
    }
  }, [studyProgramName && selectedStudyProgram]);

  useEffect(() => {
    if (props.current) {
      getSpezialization(props.current.specialization);
    }
  }, [allStudy_programs]);
  return (
    <form className={styles.col__two}>
      {/*Auswahl des Studiengangs vorausgewählt oder über den globalen Button*/}
      <div>
        <label>
          Studiengang
          {selectedStudyProgram ? (
            <input
              type={"text"}
              value={study_programsName?.name}
              readOnly
            ></input>
          ) : (
            <select onChange={(e) => setStudyNameID(e.target.value)}>
              <option value="none" selected disabled hidden />
              {studyProgramName?.map((name, _index) => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <label>
          Schwerpunkt
          {selectedStudyProgram && specialization ? (
            <input
              type={"text"}
              readOnly
              value={specialization}
              onLoad={() => getSpezialization()}
            />
          ) : (
            <select onChange={(e) => setStudy_programs(e.target.value)}>
              <option value="none" selected disabled hidden />
              {allStudy_programs
                ?.filter((studyId) => studyId.study_name == studyNameID)
                .map((specialization, _index) => (
                  <option key={specialization.id} value={specialization.id}>
                    {specialization.specialization}
                  </option>
                ))}
            </select>
          )}
        </label>

        {/*  Persönliche Angaben zu der Bewerbung*/}
        <h2>persönliche Angaben</h2>
        <label>
          Vorname
          <input type={"text"} onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <label>
          Nachname
          <input type={"text"} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Telefonnummer
          <input type="text" onChange={(e) => setTelefone(e.target.value)} />
        </label>

        <UploadDocuments onUploadSuccess={handleUploadSuccess} />
                {pdfUrl && (
                  <div>
                    <h2>Uploaded PDF:</h2>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      {pdfUrl}
                    </a>
                  </div>
        )}

        <Button onClick={() => postApplication()} variant={"contained"}>
          Jetzt Bewerben
        </Button>
      </div>
    </form>
  );
}
