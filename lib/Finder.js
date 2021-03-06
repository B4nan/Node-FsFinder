// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Finder, Helpers, compare, isFunction, moment, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./Base');

  Helpers = require('./Helpers');

  moment = require('moment');

  compare = require('operator-compare');

  isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  Finder = (function(_super) {
    __extends(Finder, _super);

    function Finder() {
      _ref = Finder.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Finder.TIME_FORMAT = 'YYYY-MM-DD HH:mm';

    Finder["in"] = function(path) {
      return new Finder(path);
    };

    Finder.from = function(path) {
      return (new Finder(path)).recursively();
    };

    Finder.find = function(path, fn, type) {
      if (fn == null) {
        fn = null;
      }
      if (type == null) {
        type = 'all';
      }
      path = Helpers.parseDirectory(path);
      return (new Finder(path.directory)).recursively().find(path.mask, fn, type);
    };

    Finder.findFiles = function(path, fn) {
      if (path == null) {
        path = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(path)) {
        fn = path;
        path = null;
      }
      return Finder.find(path, fn, 'files');
    };

    Finder.findDirectories = function(path, fn) {
      if (path == null) {
        path = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(path)) {
        fn = path;
        path = null;
      }
      return Finder.find(path, fn, 'directories');
    };

    Finder.findFile = function(path, fn) {
      if (path == null) {
        path = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(path)) {
        fn = path;
        path = null;
      }
      return Finder.findFirst().find(path, fn, 'files');
    };

    Finder.findDirectory = function(path, fn) {
      if (path == null) {
        path = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(path)) {
        fn = path;
        path = null;
      }
      return Finder.findFirst().find(path, fn, 'directories');
    };

    Finder.prototype.find = function(mask, fn, type) {
      var _ref1;
      if (mask == null) {
        mask = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (type == null) {
        type = 'all';
      }
      if (isFunction(mask)) {
        type = fn;
        fn = mask;
        mask = null;
      }
      mask = Helpers.normalizePattern(mask);
      if (this.up === true || ((_ref1 = typeof this.up) === 'number' || _ref1 === 'string')) {
        if (fn === null) {
          return this.getPathsFromParentsSync(mask, type);
        } else {
          return this.getPathsFromParentsAsync(fn, mask, type);
        }
      } else {
        if (fn === null) {
          return this.getPathsSync(type, mask);
        } else {
          return this.getPathsAsync(fn, type, mask);
        }
      }
    };

    Finder.prototype.findFiles = function(mask, fn) {
      if (mask == null) {
        mask = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(mask)) {
        fn = mask;
        mask = null;
      }
      return this.find(mask, fn, 'files');
    };

    Finder.prototype.findDirectories = function(mask, fn) {
      if (mask == null) {
        mask = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(mask)) {
        fn = mask;
        mask = null;
      }
      return this.find(mask, fn, 'directories');
    };

    Finder.prototype.findFile = function(mask, fn) {
      if (mask == null) {
        mask = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(mask)) {
        fn = mask;
        mask = null;
      }
      return this.findFirst().find(mask, fn, 'files');
    };

    Finder.prototype.findDirectory = function(mask, fn) {
      if (mask == null) {
        mask = null;
      }
      if (fn == null) {
        fn = null;
      }
      if (isFunction(mask)) {
        fn = mask;
        mask = null;
      }
      return this.findFirst().find(mask, fn, 'directories');
    };

    Finder.prototype.size = function(operation, value) {
      this.filter(function(stat) {
        return compare(stat.size, operation, value);
      });
      return this;
    };

    Finder.prototype.date = function(operation, value) {
      this.filter(function(stat) {
        var date;
        switch (Object.prototype.toString.call(value)) {
          case '[object String]':
            date = moment(value, Finder.TIME_FORMAT);
            break;
          case '[object Object]':
            date = moment().subtract(value);
            break;
          default:
            throw new Error('Date format is not valid.');
        }
        return compare((new Date(stat.mtime)).getTime(), operation, date.valueOf());
      });
      return this;
    };

    return Finder;

  })(Base);

  module.exports = Finder;

}).call(this);
