open Complex;

let spring = (~friction, ~tension, ~endPos, ~startVel, t) => {
  let minusOne = neg(one);
  let twoo = {re: 2., im: 0.};
  let minusTwoo = neg(twoo);
  let half = {re: 0.5, im: 0.};
  let doubleVel = {re: 2. *. startVel, im: 0.};
  let negDoubleVel = {re: (-2.) *. startVel, im: 0.};
  let compFriction = {re: friction, im: 0.};
  let negCompFriction = neg(compFriction);
  let compEndPos = {re: endPos, im: 0.};
  let compT = {re: t, im: 0.};

  let elastic =
    Complex.sqrt({re: friction *. friction -. 4. *. tension, im: 0.});

  let m = div(div(minusOne, twoo), elastic);

  let z1 =
    mul(
      doubleVel,
      elastic
      |> mul(minusOne)
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
    );

  let z2 =
    mul(
      negDoubleVel,
      elastic
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
    );

  let a =
    mul(
      elastic
      |> mul(minusOne)
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
      mul(negCompFriction, compEndPos),
    );

  let b =
    mul(
      mul(compFriction, compEndPos),
      elastic
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
    );

  let c =
    mul(
      mul(elastic, compEndPos),
      mul(elastic, minusOne)
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
    );

  let d =
    mul(
      mul(elastic, compEndPos),
      elastic
      |> add(negCompFriction)
      |> mul(compT)
      |> mul(half)
      |> Complex.exp,
    );

  let e = mul(mul(elastic, compEndPos), minusTwoo);

  let result =
    add(zero, z1)
    |> add(z2)
    |> add(a)
    |> add(b)
    |> add(c)
    |> add(d)
    |> add(e)
    |> mul(m);

  result.re;
};
