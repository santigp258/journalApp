import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();

  const notes = [];

  //add to array notes data
  notesSnap.forEach((snapChildren) => {
    notes.push({
      id: snapChildren.id,
      ...snapChildren.data(),
    });
  });
  return notes;
};
