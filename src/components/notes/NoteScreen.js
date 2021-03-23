import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCleaning, activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

import Swal from "sweetalert2";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);

  const dispatch = useDispatch();
  //active note
  const activeId = useRef(note.id);
  useEffect(() => {
    //show changes when one note selected
    if (note?.id !== activeId.current) {
      reset(note, reset);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    //refresh active note
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const { body, title } = formValues;

  //delete
  const handleDelete = () => {
    //delete note
    Swal.fire({
      title: `Are you sure remove "${note.title}"?`,
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: "Remove",
    }).then((result) => {
      if (!result.isConfirmed) {
        Swal.fire("Removed", "", "info");
        dispatch(actionCleaning());
        dispatch(startDeleting(note.id));
      }
    });
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          onChange={handleInputChange}
          value={title}
          autoComplete="off"
        />

        <textarea
          placeholder="What Happened today?"
          className="notes__textarea"
          name="body"
          onChange={handleInputChange}
          value={body}
          autoComplete="off"
        ></textarea>
        <div className="notes__image">
          {note.url && <img src={note.url} alt="Stars" />}
        </div>
      </div>

      <button className="btn btn-warning" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
