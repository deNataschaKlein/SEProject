import React from "react";
import styles from "./modalOffCanvas.module.css";
import * as AiIcons from "react-icons/ai";

function ModalOffCanvas(props: any) {
  function close() {
    props.setModal(false);
  }
  return (
    <>
      {props.setModal && (
        <div className={styles.modalOffCanvas}>
          <div className={styles.modalOffCanvas__dialog}>
            <div className={styles.modalOffCanvas__content}>
              <div className={styles.modalOffCanvas__header}>
                <button
                  className={styles.modalOffCanvas__closeButton}
                  onClick={close}
                >
                  <AiIcons.AiOutlineClose size={36} />
                </button>
                <span>
                  <h2>{props.headline}</h2>
                </span>
              </div>
              <div>{props.children}</div>
            </div>
            {props.button && (
              <div className={styles.modalOffCanvas__footer}>
                <div className={styles.modalOffCanvas__buttons}>
                  <button onClick={close}> schließen</button>
                  <button className="button--primary">{props.button}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ModalOffCanvas;
