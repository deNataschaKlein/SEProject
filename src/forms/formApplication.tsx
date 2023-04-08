import styles from "../styles/Form.module.css";
import ContainerBase from "@/components/ContainerBase";
import { Button } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";

export default function FormApplication(props: any) {
  const application = props.applications;

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
      <form className={styles.col__two}>
        <div>
          <h2>Studium</h2>

          <h2>Werdegang</h2>
          <label>
            Adresse
            <input type={"text"} value={application.address} />
          </label>
          <label>
            Telefon
            <input type={"text"} value={application.telefone} />
          </label>
          <label>
            E-Mail Adresse
            <input type={"text"} value={application.email} />
          </label>
        </div>
        <div>
          <ContainerBase>
            Ein Bild
            <Button variant={"contained"} onClick={() => changeStatus(3)}>
              Bewerbuung annehmen
            </Button>
            <Button variant={"outlined"} onClick={() => changeStatus(4)}>
              Bewerbung ablehnen
            </Button>
          </ContainerBase>
        </div>
      </form>
    </div>
  );
}
