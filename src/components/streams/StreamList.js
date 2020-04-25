import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions/streams';
import {Link} from 'react-router-dom';

class StreamList extends React.Component {

  componentDidMount(){
    this.props.fetchStreams();
  }

  renderAdmin = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <button className="ui button negative">Delete</button>
        </div>
      )
    }
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      )
    })
  }

  renderCreate = () => {
    const {isSignedIn} = this.props;
    if (isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link className="ui button primary" to="/streams/new">Create Stream</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = ({streams, auth}) => {
  const {list, error} = streams;
  return {
    streams: Object.values(list),
    isSignedIn: auth.isSignedIn,
    currentUserId: auth.userId,
    error
  }
}

const actionCreators = {
  fetchStreams
}

export default connect(mapStateToProps, actionCreators)(StreamList);