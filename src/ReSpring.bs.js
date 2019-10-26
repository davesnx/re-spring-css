'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Animation$ReasonReactExample = require("./Animation.bs.js");

function calculateSpring(initialValue, finalValue, tension, friction, startVel, t) {
  var partial_arg = finalValue - initialValue;
  var fn = function (param) {
    return Animation$ReasonReactExample.spring(friction, tension, partial_arg, startVel, param);
  };
  return initialValue + Curry._1(fn, t);
}

function createPropertyKeyFrame(tension, friction, initialValue, finalValue, property) {
  return Belt_List.makeBy(101, (function (i) {
                return /* tuple */[
                        i,
                        /* :: */[
                          Curry._1(property, calculateSpring(initialValue, finalValue, tension, friction, 0, i / 100)),
                          /* [] */0
                        ]
                      ];
              }));
}

function createTransformKeyFrame(tension, friction, initialValue, finalValue, transform) {
  return Belt_List.makeBy(101, (function (i) {
                return /* tuple */[
                        i,
                        /* :: */[
                          Css.transform(Curry._1(transform, Css.pxFloat(calculateSpring(initialValue, finalValue, tension, friction, 0, i / 100)))),
                          /* [] */0
                        ]
                      ];
              }));
}

function merge(keyframeA, keyframeB) {
  return List.map2((function (a, b) {
                return /* tuple */[
                        a[0],
                        List.append(a[1], b[1])
                      ];
              }), keyframeA, keyframeB);
}

var timings = 101;

exports.timings = timings;
exports.calculateSpring = calculateSpring;
exports.createPropertyKeyFrame = createPropertyKeyFrame;
exports.createTransformKeyFrame = createTransformKeyFrame;
exports.merge = merge;
/* Css Not a pure module */
