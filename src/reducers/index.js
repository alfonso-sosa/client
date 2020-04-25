import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './auth';
import streams from './streams';

export default combineReducers({
  auth,
  streams,
  form
});
