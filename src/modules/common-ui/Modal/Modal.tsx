import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import styles from "./styles.module.scss";

export type ModalProps = {
  children: ReactNode;
  title?: string;
  setModalIsOpen: (value: boolean) => void;
  modalIsOpen: boolean;
  width?: string;
  fullSize?: boolean;
};

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      className={styles.iconClose}
      fill="#8C929A"
      fillRule="evenodd"
      d="M14.123 12l9.437-9.438A1.5 1.5 0 1 0 21.438.44L12 9.878 2.562.44A1.5 1.5 0 1 0 .44 2.562L9.878 12 .44 21.438a1.5 1.5 0 1 0 2.122 2.122L12 14.122l9.438 9.438a1.496 1.496 0 0 0 2.122 0 1.5 1.5 0 0 0 0-2.122L14.123 12z"
    />
  </svg>
);

export const Modal = ({
  children,
  title,
  setModalIsOpen,
  modalIsOpen,
  width = "35%",
  fullSize = false
}: ModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: window.innerWidth <= 800 ? "80%" : width,
      overflow: "visible",
      padding: fullSize ? "0" : "20px"
    },
    overlay: { zIndex: "10000000", backgroundColor: "rgba(0, 0, 0, 0.25)" }
  };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <div className={styles.modal}>
        {title && !fullSize && (
          <div className={styles.header}>
            <div className={styles.hiddenBox} />
            <div className={styles.title}>{title}</div>
            <div onClick={() => setModalIsOpen(false)}>{CloseIcon}</div>
          </div>
        )}
        {!title && !fullSize && (
          <div className={styles.closeButton}>
            <div onClick={() => setModalIsOpen(false)}>{CloseIcon}</div>
          </div>
        )}
        {fullSize && (
          <div className={styles.fullSizeCloseButton}>
            <div onClick={() => setModalIsOpen(false)}>{CloseIcon}</div>
          </div>
        )}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </ReactModal>
  );
};
