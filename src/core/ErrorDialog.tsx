import { useState, useContext } from "react";
import "./ErrorDialog.scss";
import { InterceptorContext } from "./ErrorInterceptorContext";
import useMediaQuery from "../shared/MediaQueryHook/MediaQuery";

const ErrorDialog = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);
  const { error, handleRemoveError } = useContext<any | {}>(InterceptorContext);

  const closeModal = () => {
    setOpen(!open);
    handleRemoveError();
  };
  

  return (
    <div className={isMobile ? "error-mobile" : "error-section"}>
      {error && !open && (
        <div className="error-block">
          <div className="error">
            <h5 className="error-code">Error</h5>
            <h6 className="error-code">{error?.detail?.errorcode}</h6>
          </div>
          <div className="error-content">
            <p className="error-message">
              {error?.faultstring || error?.message}
            </p>
            <button className="error-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDialog;
