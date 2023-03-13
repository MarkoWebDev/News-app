import React from "react";
import "./WrapperContainer.scss";

const WrapperContainer = ({ children }: { children?: React.ReactNode }) => {
  return <div className="wrapper-section">{children}</div>;
};

export default WrapperContainer;
