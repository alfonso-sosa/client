import streams from '../apis/streams';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './actionNames';
import history from '../history';

export const createStream = streamProps =>  (dispatch, getState) => {
  const {userId} = getState().auth;
  dispatch({
    type: CREATE_STREAM.ACTION,
    payload: streams.post('/streams', {...streamProps, userId})
  }).then(_ => {
    history.push('/');
  })
};

export const fetchStreams = () => dispatch => {
  dispatch({
    type: FETCH_STREAMS.ACTION,
    payload: streams.get('/streams')
  });
}

export const fetchStream = id => dispatch => {
  dispatch({
    type: FETCH_STREAM.ACTION,
    payload: streams.get(`/streams/${id}`)
  });
}

export const editStream = (id, streamProps) => dispatch => {
  dispatch({
    type: EDIT_STREAM.ACTION,
    payload: streams.patch(`/streams/${id}`, streamProps)
  }).then(_ => {
    history.push('/');
  });
}

export const deleteStream = id => dispatch => {
  dispatch({
    type: DELETE_STREAM.ACTION,
    payload: streams.delete(`/streams/${id}`)
  }).then(_ => {
    history.push('/');
  });
}