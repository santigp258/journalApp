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
});
