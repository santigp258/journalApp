import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploading } from "../../actions/notes";
import moment from "moment";

export const NotesAppBar = () => {
  //time
  const currentTime = new Date().getTime();
  const noteDate = moment(currentTime);

  const dispatch = useDispatch();
  //notes state
  const { active } = useSelector((state) => state.notes);

  //save note
  const handleSave = () => {
    dispatch(startSaveNotes(active));
  };

  const inputUploadImage = useRef();
  const handlePictureUpload = () => {
    inputUploadImage.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>{noteDate.format("dddd, MMMM Do")}</span>

      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={inputUploadImage}
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
