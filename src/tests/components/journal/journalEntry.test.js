import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { JournalEntry } from "../../../components/journal/JournalEntry";
const middlewares = [thunk];

//create store
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();
const note = {
  id: 123,
  date: 0,
  title: "hola",
  body: "mundo",
  url: "https://hixd.com/foto.png",
};
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...note} />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en <JournalEntry/>", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe  de activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();

    expect(store.dispatch).toHaveBeenCalled();
  });
});
