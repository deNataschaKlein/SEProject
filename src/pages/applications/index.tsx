import { NextPage } from "next";
import styles from "./applications.module.css";
import BoxApplications from "@/components/BoxApplications";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Box, Button, Modal } from "@mui/material";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import ContainerBase from "@/components/ContainerBase";
import ChipHeadline from "@/components/ChipHeadline";
import FormApplicationManager from "@/forms/formApplicationManager";
import PillCheckbox from "@/components/PillCheckbox";

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [studyPrograms, setStudyPrograms] = useState<any[]>([]);
  const [studyNames, setStudyNames] = useState<any>();
  const [editApplitcation, seteditApplitcation] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const [employee] = useState(true);

  const [filterTags, setFilterTags] = useState<any[]>([]);

  const handleClose = () => setOpen(false);

  //Load Applications
  async function getApplications() {
    let { data: applications, error } = await supabase
      .from("applications")
      .select("*");
    if (applications) {
      setApplications(applications);
    }

    if (error) {
      alert(error.message);
    }
  }

  async function getStudyPrograms() {
    let { data: study_programs, error } = await supabase
      .from("study_programs")
      .select("*");

    if (study_programs) {
      setStudyPrograms(study_programs);
    }
    if (error) {
      alert(error);
    }
  }

  async function getStudyNames() {
    let { data, error } = await supabase.from("study_name").select("*");

    if (data) {
      setStudyNames(data);
    }
    if (error) alert(error);
  }

  useEffect(() => {
    getStudyNames();
    getApplications();
    getStudyPrograms();
  }, []);

  const filteredDATA = applications.filter((application) =>
    filterTags.length > 0
      ? filterTags.find((filter) => filter == application.studyName)
      : applications
  );

  const filterHandler = (event: any) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      );
    }
  };

  const sendApplications = filteredDATA.filter(
    (application) => application.status === 1
  );
  const workApplications = filteredDATA.filter(
    (application) => application.status === 2
  );
  const acceptApplications = filteredDATA.filter(
    (application) => application.status === 3
  );
  const declineApplications = filteredDATA.filter(
    (application) => application.status === 4
  );

  function editApplication(application: Object) {
    setOpen(true);
    seteditApplitcation(application);
  }

  async function startEditing() {
    setOpen(false);

    const { error } = await supabase
      .from("applications")
      .update({ status: 2 })
      .eq("id", editApplitcation.id);

    if (error) {
      alert(error);
    } else window.location.reload();
  }

  function getStudyName(applicationStudyProgram: any) {
    const StudyProgramName = studyPrograms.find(
      (program) => applicationStudyProgram == program.id
    );

    const studyNameID = StudyProgramName?.study_name;

    const studyName = studyNames?.find((name: any) => name.id == studyNameID);

    if (studyName) {
      return studyName.name;
    }
  }

  function getSpecialization(applicationStudyProgram:any) {
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

  function showApplication(application: Object[]) {
    seteditApplitcation(application);
    setApplicationModal(true);
  }

  return (
    <>
      <h1>Bewerbungen verwalten</h1>
      <ContainerBase>
        <div className={styles.applications__filter}>
          <div>
            <h2>Filter</h2>
            <div>
              {studyNames?.map((study: any, _index: any) => (
                <PillCheckbox
                  label={study.name}
                  id={study.id}
                  value={study.id}
                  onClick={filterHandler}
                />
              ))}
            </div>
          </div>
        </div>
      </ContainerBase>

      {/* Applications*/}
      <div className={styles.applications}>
        {/*Incoming Applications*/}
        <div>
          <ChipHeadline
            label={"Eingänge"}
            number={sendApplications.length.toString()}
          />
          <ContainerBase>
            {sendApplications.map((application, _index) => (
              <div
                onClick={() => editApplication(application)}
                key={application.id}
              >
                <BoxApplications
                  name={application.firstname + " " + application.name}
                  studyProgram={getStudyName(application.study_programs)}
                  specialization={getSpecialization(application.study_programs)}
                  document_url={application.document_url}
                />
              </div>
            ))}
          </ContainerBase>
        </div>

        {/*in Progress Applications*/}
        <div>
          <ChipHeadline
            label={"in Bearbeitung"}
            number={workApplications.length.toString()}
          />
          <ContainerBase>
            {workApplications.map((application, _index) => (
              <div
                onClick={() => showApplication(application)}
                key={application.id}
              >
                <BoxApplications
                  name={application.firstname + " " + application.name}
                  studyProgram={getStudyName(application.study_programs)}
                  specialization={getSpecialization(application.study_programs)}
                  document_url={application.document_url}
                />
              </div>
            ))}
          </ContainerBase>
        </div>

        {/*accept and declined Applications*/}
        <div className={styles.lastColumn}>
          <div>
            <ChipHeadline
              label={"Angenommen"}
              number={acceptApplications.length.toString()}
            />
            <ContainerBase>
              {acceptApplications.map((application, _index) => (
                <BoxApplications
                  key={application.id}
                  name={application.firstname + " " + application.name}
                  studyProgram={getStudyName(application.study_programs)}
                  specialization={getSpecialization(application.study_programs)}
                  document_url={application.document_url}
                />
              ))}
            </ContainerBase>
          </div>
          <div>
            <ChipHeadline
              label={"Abgelehnt"}
              number={declineApplications.length.toString()}
            />
            <ContainerBase>
              {declineApplications.map((application, _index) => (
                <BoxApplications
                  key={application.id}
                  name={application.firstname + " " + application.name}
                />
              ))}
            </ContainerBase>
          </div>
        </div>
      </div>

      {/*Initital Modal to Start Edit-Mode*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box__modal}>
          <h2>Bewerbung bearbeiten</h2>
          <p>Möchtest du mit der Bearbeitung der Bewerbung von starten?</p>
          <Button variant={"contained"} onClick={startEditing}>
            Ja
          </Button>
        </Box>
      </Modal>

      {/*Modal to show up details of an application*/}
      {applicationModal && (
        <ModalOffCanvas setModal={setApplicationModal}>
          <FormApplicationManager
            applications={editApplitcation}
            studyPrograms={getStudyProgram(editApplitcation)}
            employee={employee}
          />
        </ModalOffCanvas>
      )}
    </>
  );
};

export default Applications;
