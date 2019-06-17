'use strict';

var Complex = require("bs-platform/lib/js/complex.js");

function spring(friction, tension, endPos, startVel, t) {
  var minusOne = Complex.neg(Complex.one);
  var twoo = /* record */[
    /* re */2,
    /* im */0
  ];
  var minusTwoo = Complex.neg(twoo);
  var half = /* record */[
    /* re */0.5,
    /* im */0
  ];
  var doubleVel_000 = /* re */2 * startVel;
  var doubleVel = /* record */[
    doubleVel_000,
    /* im */0
  ];
  var negDoubleVel_000 = /* re */-2 * startVel;
  var negDoubleVel = /* record */[
    negDoubleVel_000,
    /* im */0
  ];
  var compFriction = /* record */[
    /* re */friction,
    /* im */0
  ];
  var negCompFriction = Complex.neg(compFriction);
  var compEndPos = /* record */[
    /* re */endPos,
    /* im */0
  ];
  var compT = /* record */[
    /* re */t,
    /* im */0
  ];
  var elastic = Complex.sqrt(/* record */[
        /* re */friction * friction - 4 * tension,
        /* im */0
      ]);
  var m = Complex.div(Complex.div(minusOne, twoo), elastic);
  var z1 = Complex.mul(doubleVel, Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, Complex.mul(minusOne, elastic))))));
  var z2 = Complex.mul(negDoubleVel, Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, elastic)))));
  var a = Complex.mul(Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, Complex.mul(minusOne, elastic))))), Complex.mul(negCompFriction, compEndPos));
  var b = Complex.mul(Complex.mul(compFriction, compEndPos), Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, elastic)))));
  var c = Complex.mul(Complex.mul(elastic, compEndPos), Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, Complex.mul(elastic, minusOne))))));
  var d = Complex.mul(Complex.mul(elastic, compEndPos), Complex.exp(Complex.mul(half, Complex.mul(compT, Complex.add(negCompFriction, elastic)))));
  var e = Complex.mul(Complex.mul(elastic, compEndPos), minusTwoo);
  return Complex.mul(m, Complex.add(e, Complex.add(d, Complex.add(c, Complex.add(b, Complex.add(a, Complex.add(z2, Complex.add(Complex.zero, z1))))))))[/* re */0];
}

exports.spring = spring;
/* No side effect */
