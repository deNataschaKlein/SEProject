import styles from "../styles/Form.module.css";
import ContainerBase from "@/components/ContainerBase";
import { Button } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";

export default function FormApplication(props: any) {
  const application = props.applications;
  const studyProgram = props.studyProgram;

  async function changeStatus(status: number) {
    const { error } = await supabase
      .from("applications")
      .update({ status: status })
      .eq("id", application.id);

    window.location.reload();
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
                <input type={"text"} value={studyProgram.name} readOnly />
              </label>
              <label>
                Schwerpunkt
                <input
                  type={"text"}
                  value={studyProgram.specialization}
                  readOnly
                />
              </label>
            </div>

            <div>
              <h2>Informationen</h2>
              <label>
                Adresse
                <input type={"text"} value={application.address} readOnly />
              </label>
              <label>
                Telefon
                <input type={"text"} value={application.telefone} readOnly />
              </label>
              <label>
                E-Mail Adresse
                <input type={"text"} value={application.email} readOnly />
              </label>
            </div>
          </div>
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
        </form>
      )}
    </div>
  );
}
