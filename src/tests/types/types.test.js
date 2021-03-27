import { types } from "../../types/types";

describe("pruebas en types", () => {
  test("debe de ser igual a type", () => {
    const typestest = {
      login: "[Auth] login",
      logout: "[Auth] logout",

      //errors
      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",

      //loading
      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",

      //notes
      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set Active note",
      notesLoad: "[Notes] Load Notes",
      notesUpdated: "[Notes] Update Notes",
      notesFileUrl: "[Notes] Update Image Url",
      notesDelete: "[Notes] Delete Note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
      notesActionCleaning: "[Notes] Action Cleaning",
    };
    expect(types).toEqual(typestest);
  });
});
