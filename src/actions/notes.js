import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";

export const startNewNote = () => {
  //async homework
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(docRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});
