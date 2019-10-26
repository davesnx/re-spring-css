'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReSpring$ReasonReactExample = require("./ReSpring.bs.js");

var fade = ReSpring$ReasonReactExample.createPropertyKeyFrame(120, 17, 0, 1, Css.opacity);

var jump = ReSpring$ReasonReactExample.createTransformKeyFrame(120, 17, 0, 100, Css.translateX);

var dobleTirabuzon = Css.keyframes(ReSpring$ReasonReactExample.merge(jump, fade));

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

exports.Styles = Styles;
/* fade Not a pure module */
