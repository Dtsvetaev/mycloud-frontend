import { createStore } from 'redux';

const initialState = {
  user: null,
  token: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { user: null, token: null };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
