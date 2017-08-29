
export default class Dispatcher {

  constructor() {

    this.callbacks  = [];

  }

  addListener(type, callback) {

    if (!type || !callback) return;

    if (this.callbacks[type] === undefined) {
      this.callbacks[type]  = [];
    }

    if (this.callbacks[type].indexOf(callback) === -1) {
      this.callbacks[type].push(callback);
    }

  }
  hasListener(type, callback) {

    if ((this.callbacks[type] !== undefined) && (this.callbacks[type].indexOf(callback) !== -1)) {
      return true;
    }

    return false;

  }

  removeListener(type, callback) {

    let typeCallbacks  = this.callbacks[type];

    if (typeCallbacks !== undefined) {

      let index = typeCallbacks.indexOf(callback);

      if (index !== - 1) {
        typeCallbacks.splice(index, 1);
      }

    }

  }
  removeAllListeners(type) {

    if (!type) {
      this.callbacks = { };
    } else {
      if (this.callbacks) {
        delete(this.callbacks[type]);
      }
    }

  }

  dispatch(type, data) {

    if (!type) return;

    let typeCallbacks  = this.callbacks[type];

    if (typeCallbacks !== undefined) {

      data          = (data === undefined) ? { } : data;
      data.target   = this;
      data.type     = type;

      for (let i = 0; i < typeCallbacks.length; i++) {
        typeCallbacks[i].call(this, data);
      }

    }

  }

}

