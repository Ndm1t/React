import { ADD_FEEDBACK } from "./ActionTypes";

export const InitialFeedback = {
  firstname: "",
  lastname: "",
  telnum: "",
  email: "",
  agree: false,
  contactType: "Tel.",
  message: "",
};
export const Feedback = (state = { ...InitialFeedback }, action) => {
  switch (action.type) {
    case ADD_FEEDBACK:
      return { ...state, feedback: action.payload };
    default:
      return { ...state };
  }
};
