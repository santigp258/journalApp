import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
export const JournalEntry = ({ id, title, body, date, url }) => {
  //date
  const noteDate = moment(date);

  //current object
  const activeEntry = {
    title,
    body,
    url,
    date,
  };
  //modify status note (active note)
  const dispatch = useDispatch();
  const handleEntryClick = () => {
    dispatch(activeNote(id, activeEntry));
  };
  return (
    <div className="animate__animated animate__pulse journal__entry mt-1" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <div className="journal__entry-content">{body}</div>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
