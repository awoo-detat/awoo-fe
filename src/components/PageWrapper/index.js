import { useEffect, useState } from "react";
import { ModalDialog, ModalHeader, ModalTitle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "@scss/modal.scss";
import { setError } from "@store/slices/gameSlice";

export default function PageWrapper({ children }) {
  const { error } = useSelector(({ game }) => game);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      error &&
      (typeof error === "string" || (typeof error === "object" && Object.keys(error).length > 1))
    ) {
      console.log("setting to true!!!!", error);
      setShowError(true);
      window.setTimeout(() => {
        setShowError(false);
        dispatch(setError(null));
      }, 5000);
    }
  }, [dispatch, error]);

  return (
    <>
      {children}
      {showError ? (
        <ModalDialog className="error-modal">
          <ModalHeader>
            <ModalTitle>Error: {JSON.stringify(error)}</ModalTitle>
          </ModalHeader>
        </ModalDialog>
      ) : null}
    </>
  );
}
