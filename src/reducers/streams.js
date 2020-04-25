import {omit, mapKeys} from 'lodash';
import {isNullOrUndefined} from 'util';
import {CREATE_STREAM, EDIT_STREAM, FETCH_STREAM, DELETE_STREAM, FETCH_STREAMS} from "../actions/actionNames";

export default (state={
  list: {},
  error: null
}, action) => {
  // init noOp
  if(isNullOrUndefined(action.payload)){
    return state;
  }
  const {data} = action.payload;
  switch(action.type){
    case FETCH_STREAM.FULFILLED:
    case CREATE_STREAM.FULFILLED:
    case EDIT_STREAM.FULFILLED:
      // const newState = {...state}
      // newState[data.id] = action.payload;
      // return newState
      // 👆 old ES, 👇 ES6 syntax key interpolation 
      return {
        list: {...state.list, [data.id]: data},
        error: null
      }
    case FETCH_STREAMS.FULFILLED:
      return {
        list: mapKeys(data, 'id'),
        error: null
      }
    case  DELETE_STREAM.FULFILLED:
      return {
        list: omit(state.list, data.id),
        error: null
      }
    case FETCH_STREAM.REJECTED:
    case CREATE_STREAM.REJECTED:
    case EDIT_STREAM.REJECTED:
    case DELETE_STREAM.REJECTED:
      return {...state, error: data}
    default:
      return state;
  }
};
