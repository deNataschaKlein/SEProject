import BoxBase from "@/components/BoxBase";
import styles from "@/components/BoxApplication.module.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const BoxEvaluations = (props: any) => {
  return (
    <>
      <BoxBase>
        <p className="primary"> {props.name}</p>

        <div className={styles.list}>
          {props.studyname1_id && (
            <span className={styles.listElement}>
              <CheckOutlinedIcon color={"primary"} /> {props.studyname1_id}
            </span>
          )}

          {props.studyname2_id && (
            <span className={styles.listElement}>
              <CheckOutlinedIcon color={"primary"} /> {props.studyname2_id}
            </span>
          )}

          {props.studyname3_id && (
            <span className={styles.listElement}>
              <CheckOutlinedIcon color={"primary"} /> {props.studyname3_id}
            </span>
          )}
        </div>

        <button
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
