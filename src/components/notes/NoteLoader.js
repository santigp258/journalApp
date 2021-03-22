import React from "react";

export const NoteLoader = () => {
  return (
    <div className="loader__container">
      <div className="loader">
        <div id="loader__Indicator">
          <div className="loader__Bar" id="loader__Bar1"></div>
          <div className="loader__Bar" id="loader__Bar2"></div>
          <div className="loader__Bar" id="loader__Bar3"></div>
          <div className="loader__Bar" id="loader__Bar4"></div>
        </div>
      </div>
    </div>
  );
};
