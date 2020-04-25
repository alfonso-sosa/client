import React from 'react';
import {pick} from 'lodash';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions/streams';
import {isNullOrUndefined} from 'util';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount(){
    const {fetchStream, match} = this.props;
    fetchStream(match.params.id);
  }

  onSubmit = formValues => {
    const {editStream, match} = this.props;
    editStream(match.params.id, formValues);
  }

  render() {
    const {stream} = this.props;
    if (isNullOrUndefined(stream)){
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}/>
      </div>
    );
  }

}

const mapStateToProps = ({streams}, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    streams: streams.list,
    stream: isNullOrUndefined(streams.list) ? null : streams.list[id]
  };
}

const actionCreators = {
  fetchStream,
  editStream
}

export default connect(mapStateToProps, actionCreators)(StreamEdit);
