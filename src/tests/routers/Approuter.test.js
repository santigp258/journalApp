import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { AppRouter } from "../../routers/AppRouter";
import { login } from "../../actions/auth";
import { act } from "@testing-library/react";
import { firebase } from "../../firebase/firebaseConfig";
jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
  notes: {
    active: {
      id: "abc",
      notes: []
    },
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("pruebas en <AppRouter/>", () => {
  test("debe de llamar el loading si está autenticado", async () => {
    let user;
    await act(async () => {
      const usercredentials = await firebase
        .auth()
        .signInWithEmailAndPassword("santigp258@gmail.com", "123456");
      user = usercredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      expect(login).not.toHaveBeenCalled();
    });
  });
});
