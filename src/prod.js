"use strict";

var _elmWebComponents = _interopRequireDefault(require("@teamthread/elm-web-components"));

var _Hello = _interopRequireDefault(require("../elm/src/Hello.elm"));

var _emporium = _interopRequireDefault(require("@xura/emporium"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_elmWebComponents["default"].configure('0.19');

_elmWebComponents["default"].register('feed-div', _Hello["default"].Elm.PortExamples, {
  setupPorts: function setupPorts(ports) {
    // let count = 0;
    // ports.receiveData.send(count.toString());
    //
    //erg
    //
    // setInterval(() => {
    //     count++;
    //     ports.receiveData.send(count.toString());
    // }, 1000)
    _emporium["default"].count.subscribe(function (_) {
      return ports.receiveData.send(_.toString());
    });
  }
});
