import BoxBase from "@/components/BoxBase";
import styles from "@/components/BoxApplication.module.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";

const BoxEvaluations = (props: any) => {
  const relevantStudyNames = props.relevantStudies;
  const [studyNames, setStudyNames] = useState<any[] | null>();

  let allRelevantStudies = studyNames?.map((group) => ({
    ...group,
    selected: relevantStudyNames?.includes(group.id),
  }));

  async function getStudyNames() {
    let { data: study_name, error } = await supabase
      .from("study_name")
      .select("*");

    if (error) {
      alert(error);
    } else setStudyNames(study_name);
  }

  useEffect(() => {
    getStudyNames();
  }, []);

  return (
    <>
      <BoxBase>
        <p className="primary"> {props.name}</p>

        <div className={styles.list}>
          {allRelevantStudies
            ?.filter((program) => program.selected)
            .map((studyNames) => (
              <span className={styles.listElement} key={studyNames.id}>
                <CheckOutlinedIcon color={"primary"} /> {studyNames.name}
              </span>
            ))}
        </div>

        <button
          className={"mt-1"}
          style={{ zIndex: 99, cursor: "pointer" }}
          onClick={props.handleDelete}
        >
          Delete
        </button>
        {props.children}
      </BoxBase>
    </>
  );
};

export default BoxEvaluations;
