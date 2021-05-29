export const initialState = {
  user: null,
  room: null,
  accountEntry: "Sign In",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SIGN_OUT_USER":
      return {
        ...state,
        user: null,
      };

    case "SET_CURRENT_ROOM":
      return {
        ...state,
        room: action.room,
      };

    case "SWITCH_TO_SIGN_IN":
      return {
        ...state,
        accountEntry: "Sign In",
      };

    case "SWITCH_TO_REGISTER":
      return {
        ...state,
        accountEntry: "Register",
      };

    default:
      return state;
  }
};

export default reducer;
