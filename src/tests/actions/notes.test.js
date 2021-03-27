/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNotes,
} from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";
import "@testing-library/react";
const middlewares = [thunk];

//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "testing",
    name: "santiago",
  },
  notes: {
    active: {
      id: "05NHoFu2NiBdi4EJyV3L",
      title: "hola",
      body: "Mundo",
    },
  },
};
let store = mockStore(initState);

describe("pruebas en notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("debe de crear una nueva nota StartNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    const idNote = actions[0].payload.id;
    await db.doc(`/testing/journal/notes/${idNote}`).delete();
  });

  test("startLoadingNotes debe de cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("testing"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote debe de actualizar la nota", async () => {
    const note = {
      id: "05NHoFu2NiBdi4EJyV3L",
      title: "Hi!!!",
      body: "Clark",
    };

    await store.dispatch(startSaveNotes(note));
    const actions = store.getActions();
    const expected = {
      type: types.notesUpdated,
      payload: { id: note.id, note: expect.any(Object) },
    };

    expect(actions[0]).toEqual(expected);
  });

/*   test("startUploading debe de actualizar el url del entry ", async () => {
    const file = new File([], "foto.jpg");

    await store.dispatch(startUploading(file));
  }); */
});
