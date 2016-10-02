const LOADING = 'location/LOCATION';
const SET = 'location/SET';

const initialState = {
  loading: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        loading: false
      };
    default:
      return state;
  }
}

export function set(coords) {
  return {
    type: SET,
    latitude: Number(coords.latitude),
    longitude: Number(coords.longitude)
  };
}

export function load() {
  return {
    type: LOADING
  };
}
