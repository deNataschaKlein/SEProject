import { NextPage } from "next";
import styles from "./applications.module.css";
import BoxApplications from "@/components/BoxApplications";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Box, Button, Modal } from "@mui/material";
import ModalOffCanvas from "@/components/ModalOffCanvas";
import FormApplication from "@/forms/formApplication";
import ContainerBase from "@/components/ContainerBase";
import ChipHeadline from "@/components/ChipHeadline";

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [editApplitcation, seteditApplitcation] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [applicationModal, setApplicationModal] = useState(false);

  const handleClose = () => setOpen(false);

  //Load Applications
  async function getApplications() {
    let { data: applications, error } = await supabase
      .from("applications")
      .select("*");
    setApplications(applications);
  }

  //Getting Name and Specialization from study_programs for each application
  /*async function getStudyProgram(id) {
    const { data, error } = await supabase
      .from('study_programs')
      .select('name, specialization, id').is('id', id)

    console.log(data)

    setStudyProgram(data);
  }*/

  useEffect(() => {
    getApplications();
    console.log(applications);
  }, []);

  const sendApplications = applications.filter(
    (application) => application.status === 1
  );
  const workApplications = applications.filter(
    (application) => application.status === 2
  );
  const acceptApplications = applications.filter(
    (application) => application.status === 3
  );
  const declineApplications = applications.filter(
    (application) => application.status === 4
  );

  function editApplication(application: Object[]) {
    setOpen(true);
    seteditApplitcation(application);
  }

  async function startEditing() {
    setOpen(false);

    const { error } = await supabase
      .from("applications")
      .update({ status: 2 })
      .eq("id", editApplitcation.id);

    window.location.reload();
  }

  function showApplication(application: Object[]) {
    seteditApplitcation(application);
    setApplicationModal(true);
  }

  return (
    <>
      <h1>Bewerbungen verwalten</h1>
      <div className={styles.applications}>
        {/*Incoming Applications*/}

        <div>
          <ChipHeadline
            label={"Eingänge"}
            number={sendApplications.length.toString()}
          />
          <ContainerBase>
            {sendApplications.map((application, _index) => (
              <div onClick={() => editApplication(application)}>
                <BoxApplications
                  name={application.firstname + " " + application.name}
                  studyProgram={"studyProgram.name"}
                  specialization={"studyProgram.specialization"}
                  cv={true}
                  image={true}
                />
              </div>
            ))}
          </ContainerBase>
        </div>
        <div>
          <ChipHeadline
            label={"in Bearbeitung"}
            number={workApplications.length.toString()}
          />
          <ContainerBase>
            {workApplications.map((application, _index) => (
              <div onClick={() => showApplication(application)}>
                <BoxApplications
                  name={application.firstname + " " + application.name}
                  studyProgram={"studyProgram.name"}
                  specialization={"studyProgram.specialization"}
                  cv={true}
                  image={true}
                />
              </div>
            ))}
          </ContainerBase>
        </div>
        <div className={styles.lastColumn}>
          <div>
            <ChipHeadline
              label={"Angenommen"}
              number={acceptApplications.length.toString()}
            />
            <ContainerBase>
              {acceptApplications.map((application, _index) => (
                <BoxApplications
                  name={application.firstname + " " + application.name}
                  studyProgram={"studyProgram.name"}
                  specialization={"studyProgram.specialization"}
                  cv={true}
                  image={true}
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
          <p>
            Möchtest du mit der Bearbeitung der Bewerbung von{" "}
            {editApplitcation.firstname + " " + editApplitcation.name} starten?
          </p>
          <Button variant={"contained"} onClick={startEditing}>
            Ja
          </Button>
        </Box>
      </Modal>

      {/*Modal to show up details of an application*/}
      {applicationModal && (
        <ModalOffCanvas setModal={setApplicationModal}>
          <FormApplication applications={editApplitcation} />
        </ModalOffCanvas>
      )}
    </>
  );
};

export default Applications;
