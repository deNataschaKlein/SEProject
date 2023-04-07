import BoxBase from "@/components/BoxBase";
import styles from "@/components/BoxApplication.module.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const BoxApplications = (props) => {
  return(
    <>
      <BoxBase>
        <p className="primary"> {props.name}</p>
        <div className={styles.list}>{props.studyProgram && (
          <span className={styles.listElement}><RocketLaunchIcon color={"primary"} /> {props.studyProgram}</span>
        )}
          {props.specialization && (
            <span className={styles.listElement}><InfoOutlinedIcon color={"primary"} /> {props.specialization}</span>
          )}
          {props.cv && (
            <span className={styles.listElement}><CheckOutlinedIcon color={"primary"} /> Lebenslauf</span>
          )}
          {props.image && (
            <span className={styles.listElement}><CheckOutlinedIcon color={"primary"} /> Foto hochgeladen</span>
          )}

        </div>
      </BoxBase>
    </>
  )

};

export default BoxApplications