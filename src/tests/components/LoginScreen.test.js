import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../components/auth/LoginScreen";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
jest.mock("../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));
const middlewares = [thunk];
//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
describe("pruebas en <LoginScreen/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe de mostarse correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de siparar la accion startGoogleLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("debe de disparar el startLogin con los respectivos argumentos", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "santiago123@gmail.com",
      "12345"
    );
  });
});
