import styles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import ContainerBase from "@/components/ContainerBase";
import { Button } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";

export default function FormApplicationManager(props: any) {
  const [applicant, setApplicant] = useState<any>(undefined);

  async function changeStatus(status: number) {
    const { error } = await supabase
      .from("applications")
      .update({ status: status })
      .eq("id", applicant?.id);

    if (error) {
      alert(error);
    } else window.location.reload();
  }

  useEffect(() => {
    setApplicant(props.applications);
  }, [props.applications]);

  return (
    <>
      {applicant && (
        <div className={styles.col__two}>
          <form>
            <h1 className="primary">
              {applicant.firstname} {applicant.name}
            </h1>
            <label>
              telefone
              <input readOnly value={applicant.telefone} />
            </label>
            <label>
              email
              <input readOnly value={applicant.email} />
            </label>
          </form>
          <div>
            <ContainerBase>
              <Button variant={"contained"} onClick={() => changeStatus(3)}>
                Bewerbung annehmen
              </Button>
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
