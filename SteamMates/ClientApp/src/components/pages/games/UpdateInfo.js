import React from "react";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";
import "../../../static/css/UpdateInfo.css";

const UpdateInfo = ({ updateInfo }) => {
  return (
    <span className="update-info">
      <span className="update-info-key">{updateInfo.name}:</span>
      <span className="update-info-value">
        {" "}
        {getElapsedTimeText(updateInfo.latestUpdate)}
      </span>
    </span>
  );
};

export default UpdateInfo;
