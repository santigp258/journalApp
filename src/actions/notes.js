import Swal from "sweetalert2";

import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
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
    dispatch(startLoadingNotes(uid));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

//save note in FireStore
export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    //user uid
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire("Saved!", note.title, "success");
  };
};

//refresh one note
export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note, //no delete key
    },
  },
});

//upload file

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please Wait",
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNotes(activeNote));

    Swal.close();
  };
};

//delete from firestore
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    await db.doc(`/${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

//delete note
export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const actionCleaning = () => ({
  type: types.notesActionCleaning,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
