
import * as arrays from './arrays';

export default class Keys {

  constructor() {

    this.shortcuts = [];
    this.onKeyDown = this.onKeyDown.bind(this);

    document.addEventListener('keydown', this.onKeyDown);

  }

  onKeyDown(e) {

    const parseKey = (key) => {

      if (key.startsWith('arrow')) {
        key = key.slice(5);
      }

      return key.toLowerCase();

    }

    const matchesKey = (shortcut) => {

      const key     = parseKey(e.key);

      if (key !== shortcut.key) return false;

      if (e.metaKey !== shortcut.reqMeta) return false;
      if (e.ctrlKey !== shortcut.reqCtrl) return false;
      if (e.shiftKey !== shortcut.reqShift) return false;
      if (e.altKey !== shortcut.reqAlt) return false;

      return true;

    }

    this.shortcuts.filter(matchesKey).forEach((shortcut) => shortcut.callback());

  }

  addShortcut(shortcut, callback) {

    const mods  = shortcut.split('+').map((m) => m.toLowerCase());

    const key      = mods.pop(),
          reqMeta  = arrays.includesAny(mods, ['command', 'cmd', 'win']),
          reqCtrl  = arrays.includesAny(mods, ['control', 'ctrl']),
          reqShift = arrays.includesAny(mods, ['shift']),
          reqAlt   = arrays.includesAny(mods, ['option', 'opt', 'alt']);

    this.shortcuts.push({ key, callback, reqMeta, reqCtrl, reqShift, reqAlt });

  }

  dispose() {

    document.removeEventListener('keydown', this.onKeyDown);

  }

}
