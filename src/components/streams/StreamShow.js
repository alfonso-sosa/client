import React from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {isNullOrUndefined} from 'util';
import {fetchStream} from '../../actions/streams';


class StreamShow extends React.Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {fetchStream, match} = this.props;
    const {id} = match.params;
    fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    const {stream} = this.props;
    if (isNullOrUndefined(stream)){
      return <div>Loading...</div>
    }
    const {title, description} = this.props.stream;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{description}</h3>
        <video ref={this.videoRef} style={{width: '100%'}} controls={true} />
      </div>
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
  fetchStream
}

export default connect(mapStateToProps, actionCreators)(StreamShow);
