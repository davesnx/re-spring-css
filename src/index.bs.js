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

var fade = createPropertyKeyFrame(120, 40, 0, 1, Css.opacity);

var jump = createTransformKeyFrame(120, 40, 0, 100, Css.translateX);

var dobleTirabuzon = Css.keyframes(merge(jump, fade));

var fadeAnimation = Css.keyframes(fade);

var root = Css.style(/* :: */[
      Css.display(/* flex */-1010954439),
      /* :: */[
        Css.justifyContent(/* center */98248149),
        /* :: */[
          Css.alignItems(/* center */98248149),
          /* :: */[
            Css.color(Css.rgb(255, 255, 255)),
            /* :: */[
              Css.width(Css.px(150)),
              /* :: */[
                Css.height(Css.px(150)),
                /* :: */[
                  Css.backgroundColor(Css.rgb(123, 123, 0)),
                  /* :: */[
                    Css.animationName(dobleTirabuzon),
                    /* :: */[
                      Css.animationDuration(1000),
                      /* :: */[
                        Css.unsafe("animation-iteration-count", "infinite"),
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var Styles = /* module */[
  /* fade */fade,
  /* jump */jump,
  /* dobleTirabuzon */dobleTirabuzon,
  /* fadeAnimation */fadeAnimation,
  /* root */root
];

ReactDOMRe.renderToElementWithId(React.createElement("div", undefined, React.createElement("div", {
              className: root
            }, "Hello")), "index");

var timings = 101;

exports.timings = timings;
exports.calculateSpring = calculateSpring;
exports.createPropertyKeyFrame = createPropertyKeyFrame;
exports.createTransformKeyFrame = createTransformKeyFrame;
exports.merge = merge;
exports.Styles = Styles;
/* fade Not a pure module */
