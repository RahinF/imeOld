export const initialState = {
  user: null,
  room: null,
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

    default:
      return state;
  }
};

export default reducer;
