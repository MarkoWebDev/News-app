import React from "react";
import "./Spinner.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
  loading: boolean;
}

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <div>
      <div>
        {loading && (
          <div className="spinner-section">
            <div className="spinner">
              <ClipLoader
                color="#bb1e1e"
                loading
                size={100}
                speedMultiplier={0.5}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spinner;
