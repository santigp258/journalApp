//active{ id, title, body, imageUrl}

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesUpdated:
      console.log('holaaa');
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    default:
      return state;
  }
};
