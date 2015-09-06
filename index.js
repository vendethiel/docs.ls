var indent = require('indent');

var docs = {
  "->": {
    definition: "A function",
    details: "Takes the arguments (comma-separated) on the left, and the function's body on the right (or indented).\nThe last expression is returned by default.\nYou can put a ",
    syntax: "(Arguments) -> Body",
    examples: [
      "add = (x, y) -> x + y",
      "upper = (str) -> str.toUpperCase()",
    ],
    see: ["-->", "!->", "~>"]
  },
  "-->": {
    definition: "A curried function.",
    examples: [
      "add-curried = (x, y) --> x + y\nadd2 = add-curried(2)\nadd2(4)",
      "call = (o, fn) --> obj[fn]()\ncall('hey')('toUpperCase')"
    ],
    see: "->"
  },
  "!->": {
    definition: "A hushed function: Like `->`, but doesn't return the last value of the function.",
    see: "->"
  },
  "~>": {
    definition: "A bound function. This kind of function will bind its `this`, to make sure it won't change",
    examples: "class A\n  val: 5\n  sayval: ~> console.log @a\nfn = (new A).sayval\nfn() # without `~>`, this'd print undefined",
    see: "->"
  },

  // don't mind me, just taking my functions for a walk...
  "~~>": {
    definition: "A function that's curried and bound",
    see: ["-->", "~>"]
  },
  "!~~>": {
    definition: "A function that's curried, bound, and hushed",
    see: ["-->", "~>", "!->"]
  },
  "!~>": {
    definition: "A function that's curried and hushed",
    see: ["-->", "!->"]
  },
  "!-->": {
    definition: "A function that's curried and hushed",
    see: ["-->", "!->"]
  },

  // operators
  "!": {
    definition: "Either prefix:! (`not`) or postfix:! (`()`)",
    examples: [
      "!true # prefix",
      "fn = ->\nfn!() # postfix",
    ],
    see: ["prefix:!", "postfix:!"]
  },
  "prefix:!": {
    definition: "Operator version of `not`",
    example: "!true # is false",
    see: "not",
  },
  "postfix:!": {
    definition: "Calls a function with no argument. Equivalent to empty parentheses (`()`)",
    example: "fn = ->\nfn! # equivalent to fn()"
  },
  "not": {
    definition: "`not` inverts a boolean",
    examples: "not true # is false",
  },
};

module.exports = function (el) {
  if (docs.hasOwnProperty(el)) {
    var doc = docs[el];
    var res = [];
    for (part in doc) {
      var val = Array.isArray(doc[part]) ? doc[part] : [doc[part]];
      res.push(part + "\n" + val.map(function (v) {
        return indent(v, 4);
      }).join("\n\n"));
    }
    return res.join("\n\n");
  } else {
    return "No doc for `" + el + "`";
  }
}
