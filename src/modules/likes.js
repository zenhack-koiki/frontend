
const POST_START = 'likes/POST_START';
const POST_SUCCESS = 'likes/POST_SUCCESS';
const POST_FAIL = 'likes/POST_FAIL';

const initialState = {
  items: [],
  loaded: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case POST_START:
      return {
        ...state,
        loading: true
      };
    case POST_SUCCESS:
      const items = action.res.items;
      return {
        ...state,
        loading: false,
        loaded: true,
        items,
        candidate: items.length ? items[0].id : '',
        index: 0
      };
    case POST_FAIL:
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
