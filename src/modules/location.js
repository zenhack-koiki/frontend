
const SET = 'location/SET';

const initialState = {
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      };
    default:
      return state;
  }
}

export function set(coords) {
  return {
    type: SET,
    latitude: coords.latitude,
    longitude: coords.longitude
  };
}
