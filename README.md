# re-spring-css

re-spring-css makes it easy to create CSS-keyframes spring animations in Reason.

You define a spring, like [chenglou/react-motion](https://github.com/chenglou/react-motion) or [react-spring.io](https://www.react-spring.io) but it's just CSS, so it runs at 60 FPS. Can't be canceled or dynamically treated.

It's an implementation in ReasonML of [gerardabello/spring-animation-keyframes](https://github.com/gerardabello/spring-animation-keyframes), all credits to [him: @gerardabello](https://github.com/gerardabello).

## How it works

```reason
module Styles = {
  open Css;

  let crazyAnimation =
    keyframes(
      /*
      You would be able to merge 2 keyframe animations, I'm waiting for a possible bug in bs-css.
      https://github.com/SentiaAnalytics/bs-css/issues/140

      createPropertyKeyFrame(
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
      )
    );

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

It's my first ReasonML module, so I would need a lot of help to bring that into a proper shape.
I have a list of issues to improve it [here](https://github.com/davesnx/re-spring-css/issues)

```bash
git clone https://github.com/davesnx/re-spring-css
yarn install
yarn start
```

## Licence

MIT
