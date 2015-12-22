
module.exports = {
  logConsole(msg) {
    if (typeof console !== 'undefined') {
      console.error(msg);
    }
  }
};

