import styles from "../styles/Form.module.css";
import applicationStyles from "../pages/applications/applications.module.css";
import { supabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import Link from "next/link";
import UploadDocuments from "@/components/UploadDocuments";

export default function FormApplication(props: any) {
  const [pdfUrl, setPdfUrl] = useState("");

  const handleUploadSuccess = (fileUrl: string) => {
    setPdfUrl(fileUrl);
  };

  const [studyProgramName, setStudyProgramName] = useState<any[] | null>(); // Inhalte aus der Datenbank WI,AI,BWL
  const [study_programsName, setStudyPrograms] = useState<any | undefined>(); //ausgewählter Schwerpunkt Name & ID
  const [allStudy_programs, setAllStudy_programs] = useState<any | undefined>(
    undefined
  );

  const [studyNameID, setStudyNameID] = useState(""); // Studiengang ID zum herausfinden des foreign key
  const [selectedStudyProgram, setSelectedStudyProgram] = useState<
    any | undefined
  >(undefined); // bei Klick auf einen existierenden Studiengang
  const [specialization, setSpecialization] = useState(undefined); // falls es current gibt

  const [study_programs, setStudy_programs] = useState<string | undefined>(
    undefined
  ); //zu verschickender Study-Program foreign Key
  const [firstname, setFirstname] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [telefone, setTelefone] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [cover_letter, setCoverLetter] = useState<string | undefined>(
    undefined
  );
  const [document_url, setDocument_url] = useState<string | undefined>(
    undefined
  );

  const [open, setOpen] = React.useState(false);
  const [applicantID, setApplicantID] = useState<string>();

  const url =
    window.location.protocol +
    "//" +
    window.location.host +
    "/applications/" +
    applicantID;

  async function getStudyName() {
    let { data: study_name, error } = await supabase
      .from("study_name")
      .select("*");
    setStudyProgramName(study_name);

    if (error) {
      alert(error);
    }
  }

  async function getStudyPrograms() {
    let { data } = await supabase.from("study_programs").select("*");

    setAllStudy_programs(data);
  }

  function getSpecialization(specialization: any) {
    let study = allStudy_programs?.find(
      (program: any) => program.specialization == specialization
    );

    setStudy_programs(study?.id);
    setStudyNameID(study?.study_name);
  }

  async function postApplication() {
    if (
      firstname &&
      name &&
      study_programs &&
      email &&
      telefone &&
      studyNameID
    ) {
      const { data, error } = await supabase
        .from("applications")
        .insert({
          firstname,
          name,
          study_programs: study_programs,
          email,
          telefone,
          status: 1,
          studyName: studyNameID,
          document_url: document_url,
          cover_letter: cover_letter,
        })
        .select("id");

      if (error) {
      } else {
        setApplicantID(data[0].id);
        setOpen(true);
      }
    }
  }

  useEffect(() => {
    void getStudyName();
    void getStudyPrograms();
    if (props.current) {
      setSelectedStudyProgram(props.current);
      setSpecialization(props.current.specialization);
    }
  }, [props]);

  useEffect(() => {
    const studiengang = studyProgramName?.find(
      (studyProgram) => studyProgram.id == selectedStudyProgram?.study_name
    );

    if (studiengang) {
      setStudyPrograms(studiengang);
    }
  }, [selectedStudyProgram, studyProgramName]);

  useEffect(() => {
    if (props.current) {
      getSpecialization(props.current.specialization);
    }
  }, [allStudy_programs, getSpecialization, props]);
  return (
    <div>
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
                onLoad={() => getSpecialization(specialization)}
              />
            ) : (
              <select onChange={(e) => setStudy_programs(e.target.value)}>
                <option value="none" selected disabled hidden />
                {allStudy_programs
                  ?.filter((studyId: any) => studyId.study_name == studyNameID)
                  .map((specialization: any, _index: any) => (
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
            <input
              type={"text"}
              onChange={(e) => setFirstname(e.target.value)}
            />
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
          <label>
            Anschreiben
            <textarea
              rows={5}
              value={cover_letter}
              id="description"
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className={"mb-1"}>
            Dokumente
            <UploadDocuments onUpload={setDocument_url} />
          </label>
          <Button onClick={() => postApplication()} variant={"contained"}>
            Jetzt Bewerben
          </Button>
        </div>
      </form>
      <Modal open={open}>
        <Box className={applicationStyles.box__modal}>
          <h2>Bewerbung wurde übermittelt</h2>
          <div>
            <p>
              kopiere dir folgenden Link, um den Status deiner Bewerbung
              jederzeit aufzurufen{" "}
            </p>
            <a id="url" href={url}>
              {url}
            </a>
          </div>
          <Link target="_blank" href={url}>
            <Button> Status abrufen</Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
