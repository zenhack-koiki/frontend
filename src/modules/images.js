
const LOAD_START = 'images/LOAD_START';
const LOAD_SUCCESS = 'images/LOAD_SUCCESS';
const LOAD_FAIL = 'images/LOAD_FAIL';

const initialState = {
  items: [],
  index: 0,
  loaded: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      const items = action.res;
      return {
        ...state,
        loading: false,
        loaded: true,
        items,
        index: 0
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        selected: undefined
      };
    default:
      return state;
  }
}
