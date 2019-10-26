let timings = 101;

let calculateSpring =
    (~initialValue, ~finalValue, ~tension, ~friction, ~startVel, ~t) => {
  let fn =
    Animation.spring(
      ~tension,
      ~friction,
      ~endPos=finalValue -. initialValue,
      ~startVel,
    );

  initialValue +. fn(t);
};

let createPropertyKeyFrame =
    (~tension, ~friction, ~initialValue, ~finalValue, ~property) =>
  Belt.List.makeBy(timings, i =>
    (
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
    )
  );

let createTransformKeyFrame =
    (~tension, ~friction, ~initialValue, ~finalValue, ~transform) =>
  Belt.List.makeBy(timings, i =>
    (
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
    )
  );

let merge = (keyframeA, keyframeB) =>
  List.map2(
    (a, b) => {
      let (keyframeATime, keyframeADef) = a;
      let (_keyframeBTime, keyframeBDef) = b;

      (keyframeATime, List.append(keyframeADef, keyframeBDef));
    },
    keyframeA,
    keyframeB,
  );

module Styles = {
  let fade =
    createPropertyKeyFrame(
      ~tension=120.,
      ~friction=40.,
      ~initialValue=0.,
      ~finalValue=1.,
      ~property=Css.opacity,
    );

  let jump =
    createTransformKeyFrame(
      ~tension=120.,
      ~friction=40.,
      ~initialValue=0.,
      ~finalValue=100.,
      ~transform=Css.translateX,
    );

  let dobleTirabuzon = Css.keyframes(merge(jump, fade));
  let fadeAnimation = Css.keyframes(fade);

  let root =
    Css.(
      style([
        display(`flex),
        justifyContent(`center),
        alignItems(`center),
        color(rgb(255, 255, 255)),
        width(px(150)),
        height(px(150)),
        backgroundColor(rgb(123, 123, 0)),
        animationName(dobleTirabuzon),
        animationDuration(1000),
        unsafe("animation-iteration-count", "infinite"),
      ])
    );
};

ReactDOMRe.renderToElementWithId(
  <div>
    <div className=Styles.root> {ReasonReact.string("Hello")} </div>
  </div>,
  "index",
);
