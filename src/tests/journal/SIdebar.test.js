import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { Sidebar } from "../../components/journal/Sidebar";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
const middlewares = [thunk];
jest.mock("../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));
//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
  notes: {
    active: { id: "abc" },
    notes: [],
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en <Sidebar/>", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar el logout", () => {
    wrapper.find("button").prop("onClick")();

    expect(startLogout).toHaveBeenCalledTimes(1);
  });

  test("debe de llamar startNewNote", () => {
    wrapper.find(".journal__new-entry").simulate("click");
    wrapper.find(".journal__new-entry").simulate("click");

    expect(startNewNote).toHaveBeenCalledTimes(2);
  });
});
