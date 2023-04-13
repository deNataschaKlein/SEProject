import { Chip } from "@mui/material";
import React from "react";
import styles from "./ChipHeadline.module.css";

const ChipHeadline = (props: any) => {
  return (
    <div className={styles.chipHeadline}>
      {props.label && <p data-testid={"label"}> {props.label} </p>}
      <Chip label={props.number} />
    </div>
  );
};

export default ChipHeadline;
