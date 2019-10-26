module Styles = {
  let fade =
    ReSpring.createPropertyKeyFrame(
      ~tension=120.,
      ~friction=40.,
      ~initialValue=0.,
      ~finalValue=1.,
      ~property=Css.opacity,
    );

  let jump =
    ReSpring.createTransformKeyFrame(
      ~tension=120.,
      ~friction=40.,
      ~initialValue=0.,
      ~finalValue=100.,
      ~transform=Css.translateX,
    );

  let dobleTirabuzon = Css.keyframes(ReSpring.merge(jump, fade));
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
