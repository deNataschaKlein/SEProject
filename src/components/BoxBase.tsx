import styles from "./BoxBase.module.css";

const BoxBase = (props: any) => {
  return <div className={styles.box}>{props.children}</div>;
};

export default BoxBase;
