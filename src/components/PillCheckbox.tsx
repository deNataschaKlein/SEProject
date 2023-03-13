import styles from "./pillCheckbox.module.css";
import { useState } from "react";

const PillCheckbox = ({ label, checked, ...props }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <label
      className={
        isChecked
          ? `${styles.pillCheckbox} ${styles.checked}`
          : styles.pillCheckbox
      }
    >
      <input
        type="checkbox"
        onChange={() => setIsChecked((prev) => !prev)}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};
export default PillCheckbox;
