import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { RegisterScreen } from "../../components/auth/RegisterScreen";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
};

let store = mockStore(initState);
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);
describe("pruebas en <RegisterScreen/>", () => {
  test("debe de mostarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de hacer el dispatch de la acción respectiva", () => {
    const emailFiel = wrapper.find('input[name="email"]');

    emailFiel.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    const actions = store.getActions();
    console.log(actions);
    expect(actions).toEqual([]);
  });
});
