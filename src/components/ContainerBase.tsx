import styles from "./Container.module.css";

const ContainerBase = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default ContainerBase;
