import React from "react";
import "./../static/css/LibraryError.css";

const LibraryError = ({ privateProfiles }) => {
  const names = privateProfiles.map(x => x.personaName);
  const className = "library-error";

  switch (privateProfiles.length) {
    case 1:
      return (
        <div className={className}>
          <span>{names[0]}</span> has a private library.
        </div>
      );
    case 2:
      return (
        <div className={className}>
          <span>{names[0]}</span> and <span>{names[1]}</span> have private
          libraries.
        </div>
      );
    case 3:
      return (
        <div className={className}>
          <span>{names[0]}</span>, <span>{names[1]}</span> and{" "}
          <span>{names[2]}</span> have private libraries.
        </div>
      );
    case 4:
      return (
        <div className={className}>
          <span>{names[0]}</span>, <span>{names[1]}</span>,{" "}
          <span>{names[2]}</span> and <span>{names[3]}</span> have private
          libraries.
        </div>
      );
    default:
      return null;
  }
};

export default LibraryError;
