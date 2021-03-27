import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("pruebas en auth reducer", () => {
  const state = {
    uid: "123",
    displayName: "santiago",
  };
  test("debe de retornar el estate por default", () => {
    const reducer = authReducer(state, {});

    expect(reducer).toEqual(state);
  });
  test("debe de logearse", () => {
    const reducer = authReducer(state, {
      type: types.login,
      payload: { ...state },
    });

    expect(reducer).toEqual({ uid: "123", name: "santiago" });
  });


  test("debe de deslogearse", () => {
    const reducer = authReducer(state, {
      type: types.login,
      payload: { ...state },
    });

    expect(reducer).toEqual({ uid: "123", name: "santiago" });
  });


  test("debe de logearse", () => {
    const reducer = authReducer(state, {
      type: types.logout,
    });

    expect(reducer).toEqual({});
  });
});
