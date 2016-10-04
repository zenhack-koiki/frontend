import geolib from 'geolib';
const LOAD_START = 'recommends/LOAD_START';
const LOAD_SUCCESS = 'recommends/LOAD_SUCCESS';
const LOAD_FAIL = 'recommends/LOAD_FAIL';
const SET_LOCATION = 'recommends/SET_LOCATION';

const initialState = {
  items: [],
  index: 0,
  loaded: false,
  loading: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      const items = action.res.map(item =>{
        const distance = (geolib.getDistance(item, state) / 1000).toFixed(2);
        return {
          ...state,
          ...item,
          distance
        };
      });
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
    case SET_LOCATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      };
    default:
      return state;
  }
}

export function setLocation(values) {
  return {
    type: SET_LOCATION,
    ...values
  };

}
