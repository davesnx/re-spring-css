# re-spring-css

re-spring-css makes it easy to create CSS-keyframes spring animations in Reason.

You define a spring, like [chenglou/react-motion](https://github.com/chenglou/react-motion) or [react-spring.io](https://www.react-spring.io) but it's just CSS, so it runs at 60 FPS. Can't be canceled or dynamically treated.

It's an implementation in ReasonML of [gerardabello/spring-animation-keyframes](https://github.com/gerardabello/spring-animation-keyframes), all credits to [him: @gerardabello](https://github.com/gerardabello).

## How it works

This module depends on [bs-css](https://github.com/SentiaAnalytics/bs-css), ensure that you install both!

```reason
module Styles = {
  open Css;
  open ReSpring;

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

  let crazyAnimation = Css.keyframes(merge(jump, fade));

  let root =
    style([
      width(px(50)),
      height(px(50)),
      backgroundColor(rgb(0, 0, 0)),
      animationName(crazyAnimation),
      animationDuration(2000),
      unsafe("animation-iteration-count", "infinite"),
    ]);
};

ReactDOMRe.renderToElementWithId(
  <div className=Styles.root> {ReasonReact.string("Hello!")} </div>,
  "index",
);
```

## Why
CSS animations runs at 60FPS (or more) even if the main thread is busy with parsing/executing JavaScript.
<!-- todo: add (link to screens with freq 120/144/etc[] -->

## Contribute (Help!)
I have a list of issues to improve it [here](https://github.com/davesnx/re-spring-css/issues)

```bash
git clone https://github.com/davesnx/re-spring-css
yarn install
yarn start
```

## Licence

MIT
