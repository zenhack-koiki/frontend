
const LOAD_START = 'images/LOAD_START';
const LOAD_SUCCESS = 'images/LOAD_SUCCESS';
const LOAD_FAIL = 'images/LOAD_FAIL';

const initialState = {
  items: [],
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
      const items = action.res.items;
      return {
        ...state,
        loading: false,
        loaded: true,
        items,
        candidate: items.length ? items[0].id : '',
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
