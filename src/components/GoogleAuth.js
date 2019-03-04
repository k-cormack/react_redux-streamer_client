import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {

  componentWillMount() {
    window.gapi.load('client:auth2', () => { // include window. - b/c gapi is available on window scope(??)
      window.gapi.client.init({
        clientId:'130482405187-fssu339i66p6sijv9330edc6nt8614am.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        console.log(this.auth);
        this.onAuthChange(this.auth.isSignedIn.get());
        console.log(this.props.isSignedIn);
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
} ;

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);