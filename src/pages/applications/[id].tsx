import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function ApplicantDetail() {
  const router = useRouter();
  const [id, setId] = useState<string | string[] | undefined>(undefined);
  const [applicant, setApplicant] = useState<any>();
  const [status, setStatus] = useState<any>();

  //Datenbank durchsuchen nach einer Bewerbung mit der UUID aus der URL
  async function getApplicantStatus() {
    let { data: applications, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id);

    const appl = applications;

    if (error) {
      alert(error);
    }
    if (appl) {
      setApplicant(appl[0]);
    }
  }

  // Bezeichnung des Status abrufen anhand des Status der Bewerbung
  async function getStatus() {
    let { data: applicationstatus, error } = await supabase
      .from("applicationstatus")
      .select("name")
      .eq("id", applicant.status);

    if (error) {
      alert(error);
    }
    if (applicationstatus) {
      const stat = applicationstatus[0];

      if (stat) {
        setStatus(stat.name);
      }
    }
  }

  //StatusID des Bewerbers einholen
  useEffect(() => {
    if (id != undefined) {
      getApplicantStatus();
    }

    if (applicant) {
      getStatus();
    }
  }, [applicant, getApplicantStatus, getStatus, id]);

  //UUID des Bewerbers erhalten
  useEffect(() => {
    if (router) {
      const routerID = router.query;
      setId(routerID.id);
    }
  }, [router]);

  return (
    <>
      {applicant && status && (
        <div>
          <h1>Hallo {applicant.firstname}</h1>
          <p>Deine Bewerbung ist {status}.</p>

          {applicant.feedback && (
            <div>
              <h3>Feedback zu deiner Bewerbung</h3>
              <p>{applicant.feedback}</p>
            </div>
          )}

          <Button
            onClick={() => {
              getApplicantStatus();
            }}
          >
            Status erneut abfragen
          </Button>
        </div>
      )}
    </>
  );
}

export default ApplicantDetail;
