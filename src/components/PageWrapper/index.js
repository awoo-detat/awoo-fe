import { useEffect, useState } from "react";
import { ModalDialog, ModalHeader, ModalTitle } from "react-bootstrap";
import { useSelector } from "react-redux";
import "@scss/modal.scss";

export default function PageWrapper({ children }) {
  const { error } = useSelector(({ game }) => game);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      console.log("setting to true!!!!");
      setShowError(true);
      window.setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [error]);

  return (
    <>
      {children}
      {showError && (
        <ModalDialog className="error-modal">
          <ModalHeader>
            <ModalTitle>Modal Dialog</ModalTitle>
          </ModalHeader>
        </ModalDialog>
      )}
    </>
  );
}
