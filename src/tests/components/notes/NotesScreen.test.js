import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";
const middlewares = [thunk];

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));
//create store
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
  notes: {
    active: { id: "abc", title: "Hi", body: "mundo", date: 12344 },
    notes: [],
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en <NotesScreen/>", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar el active note", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hello again",
      },
    });

    expect(activeNote).toHaveBeenCalled()
  });
});
