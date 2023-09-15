import React from "react";
import '../index.css';

const ErrorMsgBox = (props) => {
  return (
    <>
      <span><small className="error-msg-css">{props.errorMsg}</small></span>
    </>
  );
};

export default ErrorMsgBox;