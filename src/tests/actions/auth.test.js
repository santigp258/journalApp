import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/react";
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";
const middlewares = [thunk];

//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "testing",
    name: "santiago",
  },
};
let store = mockStore(initState);

describe("pruebas en auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("login y logout deben de crear la accion respectiva", () => {
    const uid = "1234";
    const displayName = "santi";
    const loginAction = login(uid, displayName);
    const logoutAction = logout();
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("debe de realizar el startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test("debe de iniciar startloginEmailPassword", async () => {
    await store.dispatch(
      startLoginEmailPassword("santigp258@gmail.com", "123456")
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.uiStartLoading });
    expect(actions[1]).toEqual({ type: types.uiFinishLoading });
    expect(actions[2]).toEqual({
      type: types.login,
      payload: { uid: "N5BcfoNHYWQeYJ0mDSEt1TpMM773", displayName: null },
    });
  });
});
