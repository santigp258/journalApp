import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { authReducer } from "../../reducers/authReducer";
import { JournalEntries } from "./JournalEntries";
export const Sidebar = () => {
  const dispatch = useDispatch(authReducer);
  const state = useSelector((state) => state.auth);
  const handleLogout = () => {
    //logout
    dispatch(startLogout());
  };

  const handleAddEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span className="journal__displayname">{state.name}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddEntry}>
        <i className="fa fa-calendar-plus fa-5x pointer"></i>
        <p>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
