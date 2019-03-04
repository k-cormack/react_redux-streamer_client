import React from 'react';


class GoogleAuth extends React.Component {
  state = { isSignedIn: null};

  componentWillMount() {
    window.gapi.load('client:auth2', () => { // include window. - b/c gapi is available on window scope(??)
      window.gapi.client.init({
        clientId:'130482405187-fssu339i66p6sijv9330edc6nt8614am.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        console.log(this.auth);
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        console.log(this.state.isSignedIn);
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get()}); //allows state change/page notification w/o refreshing the page
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onSignIn}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  };
}

export default GoogleAuth;