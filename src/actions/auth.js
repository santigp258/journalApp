import { types } from "../types/types";

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch)=> {
        setTimeout(() => {
            dispatch(login('santigclar', 1235));
        }, 3000);
    }
}

//return login action
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
