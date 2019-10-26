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
