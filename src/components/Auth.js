import React from 'react';
import {connect} from 'react-redux';
import {signIn} from '../actions/auth';
import {signOut} from '../actions/auth';

class Auth extends React.Component {
  state = {
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '599121271096-d5ba8tsnc2jlath0e742sh622oiuc2r9.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    }
    else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton = () => {
    const {isSignedIn} = this.props;
    switch (isSignedIn) {
      case true:
        return (
          <button className="ui red google button" onClick={this.onSignOutClick}>
            <i className="google icon" />
            Sign Out
          </button>
        );
      case false:
        return (
          <button className="ui blue google button" onClick={this.onSignInClick}>
            <i className="google icon" />
            Sign In with Google
          </button>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {isSignedIn} = auth;
  return {
    isSignedIn
  }
}

const actionCreators = {
  signIn,
  signOut
}

export default connect(mapStateToProps, actionCreators)(Auth);
