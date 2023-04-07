import { NextPage } from "next";
import styles from "./applications.module.css";
import BoxApplications from "@/components/BoxApplications";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Box, Button, Modal } from "@mui/material";

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [editApplitcation, seteditApplitcation] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

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
  const readyApplications = applications.filter(
    (application) => application.status === 3 || application.status === 4
  );

  function editApplication(application) {
    setOpen(true);
    seteditApplitcation(application);
  }

  async function startEditing() {
    setOpen(false)

    const { error } = await supabase
      .from('applications')
      .update({ status: 2 })
      .eq('id', editApplitcation.id)

    window.location.reload()
  }

  return (
    <>
      <h1>Bewerbungen verwalten</h1>
      <div className={styles.applications}>
        {/*Incoming Applications*/}

        <div className={styles.container}>
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
        </div>

        <div className={styles.container}>
          {workApplications.map((application, _index) => (
            <BoxApplications
              name={application.firstname + " " + application.name}
              studyProgram={"studyProgram.name"}
              specialization={"studyProgram.specialization"}
              cv={true}
              image={true}
            />
          ))}
        </div>
        <div className={styles.container}>
          {readyApplications.map((application, _index) => (
            <BoxApplications
              name={application.firstname + " " + application.name}
              studyProgram={"studyProgram.name"}
              specialization={"studyProgram.specialization"}
              cv={true}
              image={true}
            />
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box__modal}>
          <h2>Bewerbung bearbeiten</h2>
          <p>Möchtest du mit der Bearbeitung der Bewerbung von {editApplitcation.firstname + ' ' + editApplitcation.name} starten?</p>
          <Button variant={"contained"} onClick={startEditing}>Ja</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Applications;
