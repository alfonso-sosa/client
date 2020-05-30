import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions/streams';
import {connect} from 'react-redux';
import {isNullOrUndefined} from 'util';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {

  componentDidMount() {
    const {fetchStream, match} = this.props;
    fetchStream(match.params.id);
  }

  renderActions() {
    const {deleteStream, match} = this.props;
    const {id} = match.params;
    return (
      <React.Fragment>
        <Link to="/" className="ui button">
          Cancel
        </Link>
        <button 
          onClick={() => {deleteStream(id)}} 
          className="ui negative button primary">
            Delete
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => {history.push('/')}}
      />
    );
  }
}

const mapStateToProps = ({streams}, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    stream: isNullOrUndefined(streams.list) ? null : streams.list[id]
  };
}

const actionCreators = {
  fetchStream,
  deleteStream
};

export default connect(mapStateToProps, actionCreators)(StreamDelete);
