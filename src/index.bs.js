'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var Animation$ReasonReactExample = require("./Animation.bs.js");

function calculateSpring(initialValue, finalValue, tension, friction, startVel, t) {
  var partial_arg = finalValue - initialValue;
  var fn = function (param) {
    return Animation$ReasonReactExample.spring(friction, tension, partial_arg, startVel, param);
  };
  return initialValue + Curry._1(fn, t);
}

function createPropertyKeyFrame(tension, friction, initialValue, finalValue, property) {
  var timings = Belt_List.makeBy(101, (function (i) {
          return i;
        }));
  return List.map((function (i) {
                return /* tuple */[
                        i,
                        /* :: */[
                          Curry._1(property, calculateSpring(initialValue, finalValue, tension, friction, 0, i / 100)),
                          /* [] */0
                        ]
                      ];
              }), timings);
}

function createTransformKeyFrame(tension, friction, initialValue, finalValue, transform) {
  var timings = Belt_List.makeBy(101, (function (i) {
          return i;
        }));
  return List.map((function (i) {
                return /* tuple */[
                        i,
                        /* :: */[
                          Css.transform(Curry._1(transform, Css.pxFloat(calculateSpring(initialValue, finalValue, tension, friction, 0, i / 100)))),
                          /* [] */0
                        ]
                      ];
              }), timings);
}

var dobleTirabuzon = Css.keyframes(createTransformKeyFrame(200, 45, 0, 100, Css.translateY));

var root = Css.style(/* :: */[
      Css.width(Css.px(50)),
      /* :: */[
        Css.height(Css.px(50)),
        /* :: */[
          Css.backgroundColor(Css.rgb(0, 0, 0)),
          /* :: */[
            Css.animationName(dobleTirabuzon),
            /* :: */[
              Css.animationDuration(2000),
              /* :: */[
                Css.unsafe("animation-iteration-count", "infinite"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var Styles = /* module */[
  /* dobleTirabuzon */dobleTirabuzon,
  /* root */root
];

ReactDOMRe.renderToElementWithId(React.createElement("div", {
          className: root
        }, "Hello!"), "index");

exports.calculateSpring = calculateSpring;
exports.createPropertyKeyFrame = createPropertyKeyFrame;
exports.createTransformKeyFrame = createTransformKeyFrame;
exports.Styles = Styles;
/* dobleTirabuzon Not a pure module */
