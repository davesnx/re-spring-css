open Animation;

let calculateSpring =
    (~initialValue, ~finalValue, ~tension, ~friction, ~startVel, ~t) => {
  let fn =
    spring(
      ~tension,
      ~friction,
      ~endPos=finalValue -. initialValue,
      ~startVel,
    );
  initialValue +. fn(t);
};

let createPropertyKeyFrame =
    (~tension, ~friction, ~initialValue, ~finalValue, ~property) => {
  /* [0,1,2,3,... 100] */
  let timings = Belt.List.makeBy(101, i => i);

  List.map(
    i => (
      i,
      [
        property(
          calculateSpring(
            ~friction,
            ~tension,
            ~initialValue,
            ~finalValue,
            ~startVel=0.,
            ~t=float_of_int(i) /. 100.,
          ),
        ),
      ],
    ),
    timings,
  );
};

let createTransformKeyFrame =
    (~tension, ~friction, ~initialValue, ~finalValue, ~transform) => {
  let timings = Belt.List.makeBy(101, i => i);

  List.map(
    i => (
      i,
      [
        Css.transform(
          transform(
            calculateSpring(
              ~friction,
              ~tension,
              ~initialValue,
              ~finalValue,
              ~startVel=0.,
              ~t=float_of_int(i) /. 100.,
            )
            |> Css.pxFloat,
          ),
        ),
      ],
    ),
    timings,
  );
};

module Styles = {
  open Css;

  let dobleTirabuzon =
    keyframes(
      /* createPropertyKeyFrame(
           ~tension=180.,
           ~friction=20.,
           ~initialValue=0.,
           ~finalValue=1.,
           ~property=opacity,
         ), */
      createTransformKeyFrame(
        ~tension=200.,
        ~friction=45.,
        ~initialValue=0.,
        ~finalValue=100.,
        ~transform=translateY,
      ),
    );

  let root =
    style([
      width(px(50)),
      height(px(50)),
      backgroundColor(rgb(0, 0, 0)),
      animationName(dobleTirabuzon),
      animationDuration(2000),
      unsafe("animation-iteration-count", "infinite"),
    ]);
};

ReactDOMRe.renderToElementWithId(
  <div className=Styles.root> {ReasonReact.string("Hello!")} </div>,
  "index",
);
