// ../_tools_/src/math.js
var RangedOperation = function(end, start = "1", step = "1", action = "pow") {
  action = action.toString().toLowerCase();
  let ret = start.toString();
  let Func = null;
  if (action === "mul") {
    Func = Multiply;
  } else if (action === "pow") {
    Func = Power;
  } else if (action === "add") {
    Func = Add;
  } else {
    console.error("Error: action was not specified for a ranged math operation!");
    return;
  }
  for (let i = Add(start, step); Greater(i, end) !== i.toString(); i = Add(i, step)) {
    ret = Func(ret, i);
  }
  return ret;
};
var Greater = function(a, b) {
  a = a.toString().split("");
  b = b.toString().split("");
  if (a.length > b.length) {
    return a.join("");
  }
  if (a.length < b.length) {
    return b.join("");
  }
  for (let i = 0; i < a.length; i++) {
    if (+a[i] > +b[i]) {
      return a.join("");
    }
    if (+a[i] < +b[i]) {
      return b.join("");
    }
  }
  return true;
};
var Multiply = function(...nums) {
  nums = [nums].flat().flat();
  let ret = nums[0].toString();
  nums = nums.slice(1);
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i].toString();
    if (Add(num, 0) === "0") {
      return "0";
    }
    let value = ret;
    let counter = "2";
    while (true) {
      if (Greater(counter, num) === counter) {
        break;
      }
      ret = Add(ret, value);
      counter = Add(counter, 1);
    }
  }
  return ret;
};
var Power = function(...nums) {
  nums = [nums].flat().flat();
  let ret = nums[0].toString();
  nums = nums.slice(1);
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i].toString();
    if (Add(num, 0) === "0") {
      ret = "1";
    }
    let value = ret;
    let counter = "2";
    while (true) {
      if (Greater(counter, num) === counter) {
        break;
      }
      ret = Multiply(ret, value);
      counter = Add(counter, 1);
    }
  }
  return ret;
};
var Add = function(...nums) {
  nums = [nums].flat().flat();
  nums = nums.map((num) => num.toString().split("").reverse());
  let ret = nums[0];
  nums = nums.slice(1);
  const _Add = function(num) {
    let carry = 0;
    let i = 0;
    while (true) {
      let sum = (carry + parseInt(num[i] ?? 0) + parseInt(ret[i] ?? 0)).toString().split("").reverse();
      ret[i] = sum[0];
      carry = sum[1] ? parseInt(sum.slice(1).reverse().join("")) : 0;
      i++;
      if (i >= num.length && carry == 0) {
        break;
      }
    }
  };
  nums.map((num) => _Add(num));
  return ret.reverse().join("");
};
var AddBinary = function(...bins) {
  bins = [bins].flat().flat();
  bins = bins.map((bin) => bin.toString().split("").reverse());
  let ret = bins[0].toString();
  bins = bins.slice(1);
  const _AddBinary = function(bin) {
    let carry = 0;
    let i = 0;
    while (true) {
      let sum = (carry + parseInt(bin[i] ?? 0) + parseInt(ret[i] ?? 0)).toString(2).split("").reverse();
      ret[i] = sum[0];
      carry = sum[1] ? parseInt(sum.slice(1).reverse().join(""), 2) : 0;
      i++;
      if (i >= bin.length && carry == 0) {
        break;
      }
    }
  };
  bins.map((bin) => _AddBinary(bin));
  return ret.reverse().join("");
};
export {
  Add,
  AddBinary,
  Greater,
  Multiply,
  Power,
  RangedOperation
};
