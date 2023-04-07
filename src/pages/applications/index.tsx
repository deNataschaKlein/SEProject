import { NextPage } from "next";
import styles from "./applications.module.css";
import BoxApplications from "@/components/BoxApplications";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const Applications: NextPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [studyProgram, setStudyProgram] = useState<any[]>([])

  //Load Applications
  async function getApplications() {
    let { data: applications, error } = await supabase
      .from('applications')
      .select('*')
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
    console.log(applications)
  }, []);

  const sendApplications = applications.filter((application) => application.status === 1)
  const workApplications = applications.filter((application) => application.status === 2)
  const readyApplications = applications.filter((application) => application.status === 3 || application.status === 4)

  console.log(sendApplications)


  return (
    <>
      <h1>Bewerbungen verwalten</h1>
        <div className={styles.applications}>
          {/*Incoming Applications*/}

          <div className={styles.container}>
            {sendApplications.map((application, _index) => (
              <BoxApplications
                name={application.firstname + ' ' + application.name}
                studyProgram={'studyProgram.name'}
                specialization={'studyProgram.specialization'}
                cv={true}
                image={true}
              />
            )) }


          </div>

          <div className={styles.container}>
            {workApplications.map((application, _index) => (
              <BoxApplications
                name={application.firstname + ' ' + application.name}
                studyProgram={'studyProgram.name'}
                specialization={'studyProgram.specialization'}
                cv={true}
                image={true}
              />
            )) }
          </div>
          <div className={styles.container}>
            {readyApplications.map((application, _index) => (
              <BoxApplications
                name={application.firstname + ' ' + application.name}
                studyProgram={'studyProgram.name'}
                specialization={'studyProgram.specialization'}
                cv={true}
                image={true}
              />
            )) }
          </div>
        </div>

    </>
  );
};

export default Applications;
