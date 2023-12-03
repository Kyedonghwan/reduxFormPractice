import { FETCH_POST, FETCH_POSTS } from "../actions";

const initial_state = { all: [], post: null };

export default function(state=initial_state, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {...state, all: action.payload.data };
    case FETCH_POST:
      return {...state, post: action.payload.data };
    default:
      return state;
  }
}