
const SET = 'sessions/SET';

const initialState = {
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
}

export function set(id) {
  return {
    type: SET,
    id
  };
}
