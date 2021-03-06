
module.exports = {
  login(email, pass, state, cb) {
    cb = arguments[arguments.length - 1];
    if (state.loginToken) {
      if (cb) cb({ loggedIn:true, modified: false, token: state.loginToken });
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        
        if (cb) cb({ loggedIn:true, modified: true, token: res.token });
        this.onChange(true);
      } else {
        if (cb) cb({ loggedIn:false, modified: true, token: '' });
        this.onChange(false);
      }
    });
  },

  getToken: function (state) {
    return state.loginToken;
  },

  logout: function (cb) {
    if (cb) cb({ error: false });
    this.onChange(false);
  },

  loggedIn: function (state) {
    return !!state.loginToken;
  },

  onChange: function () {}
};

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({ authenticated: false });
    }
  }, 0);
}

