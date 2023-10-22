// ../_tools_/src/Math.js
var hex = "0123456789ABCDEF";
var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var Fibonacci = function(loops) {
  loops = Subtract(loops, 2);
  let prev = "0";
  let current = "1";
  let ret = ["0", "1"];
  for (let i = "0"; Greater(i, loops) === loops; i = Add(i, 1)) {
    current = Add(current, prev);
    prev = Subtract(current, prev);
    ret.push(current);
  }
  if (loops.includes("-")) {
    ret = ret.slice(0, parseInt(loops));
  }
  ;
  return ret;
};
var Zeros = function(str, len, side = "left") {
  str = str.toString();
  while (str.length < len) {
    if (side.toLowerCase() === "left") {
      str = "0" + str;
    } else if (side.toLowerCase() === "right") {
      str = str + "0";
    }
  }
  return str;
};
var Split = function(inp, num) {
  inp = inp.toString();
  var out = [];
  for (var i = 0; i < inp.length; i += num) {
    out.push(inp.slice(i, i + num));
  }
  return out;
};
var GetBit = function(num, pos) {
  num = DecimalToAny(num, "01");
  num = [...num.split("")].reverse().join("");
  num = num.slice(+pos, +pos + 1);
  if (num === "") {
    num = "0";
  }
  return num;
};
var CountSetBits = function(num) {
  return DecimalToAny(num, "01").replaceAll("0", "").length;
};
var CountDiffBits = function(a, b) {
  return CountSetBits(Xor(a, b));
};
var MeasureBits = function(num) {
  return DecimalToAny(num, "01").length;
};
var Bases = function(str, from, to, padding = "") {
  str = str.toString();
  from = from === null ? from : from.toString();
  to = to === null ? to : to.toString();
  let toLength = to === null ? null : to.length;
  if (typeof toLength === "number" && toLength < 2) {
    return null;
  }
  let toBits = toLength === null ? null : MeasureBits(toLength);
  let toFloatBits = toLength === null ? null : MeasureBits(toLength, false);
  let toSize = toBits === null ? null : RoundUp(toBits, 8) / toBits;
  let toFloat = toFloatBits !== parseInt(toFloatBits);
  let fromLength = from === null ? null : from.length;
  if (typeof fromLength === "number" && fromLength < 2) {
    return null;
  }
  let fromBits = fromLength === null ? null : MeasureBits(fromLength);
  let fromFloatBits = fromLength === null ? null : MeasureBits(fromLength, false);
  let fromSize = fromBits === null ? null : RoundUp(fromBits, 8) / fromBits;
  let fromFloat = fromFloatBits !== parseInt(fromFloatBits);
  let num = "";
  let out = [];
  if (from === to) {
    return str;
  }
  if (from !== null) {
    let re = new RegExp("(" + padding + "){1,}$", "g");
    str = str.replaceAll(re, "");
  }
  if (from !== null && to !== null) {
    if (from === "0123456789") {
      out = FromDecimal(str, to);
    } else if (to === "0123456789") {
      out = ToDecimal(str, from);
    } else {
      out = FromDecimal(ToDecimal(str, from), to);
    }
  } else if (from === null && to !== null && toFloat === true) {
    let bytes = StringToBytes(str);
    let hex2 = bytes.map((byte) => byte.toString(16)).join("");
    let deci = ToDecimal(hex2.toUpperCase(), "0123456789ABCDEF");
    out = FromDecimal(deci, to);
  } else if (from === null && to !== null) {
    let bytes = StringToBytes(str);
    let bin2 = bytes.map((byte) => Zeros((+byte).toString(2), 8)).join("");
    let bin = bin2 + "0".repeat((toBits - bin2.length % toBits) % toBits);
    out = FromBinary(bin, to);
  } else if (from !== null && to === null && fromFloat === true) {
    out = BytesToString(
      Split(
        FromDecimal(ToDecimal(str, from), "0123456789ABCDEF"),
        2
      ).map(
        (hx) => ToDecimal(hx, "0123456789ABCDEF")
      )
    );
  } else if (from !== null && to === null) {
    let charsLength = Split(str, fromSize).length;
    let bin = ToBinary(str, from);
    bin = Zeros(bin, RoundUp(bin.length, 8));
    let bytes = Split(bin.slice(0, charsLength * 8), 8).map((b) => parseInt(b, 2));
    out = BytesToString(bytes);
  }
  if (toSize !== null) {
    out += padding.repeat((toSize - out.length % toSize) % toSize);
  }
  return out;
};
var AnyToDecimal = function(str, charset = null) {
  str = str.toString();
  let ret = [];
  if (charset === null) {
    for (let i = 0; true; i++) {
      if (typeof str.codePointAt(i) === "undefined") {
        while (true) {
          if (ret.length > 1 && ret[0] === "0") {
            ret = ret.slice(1);
          } else {
            return ret.join("");
          }
        }
      }
      let char = str.split("")[i];
      ret.push(str.codePointAt(i));
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    let char = str.slice(0, 1);
    str = str.slice(1);
    let value = Multiply(Power(charset.length, i), charset.indexOf(char));
    ret.push(value);
  }
  return Add(ret, 0);
};
var ToDecimal = AnyToDecimal;
var BinaryToAny = function(bin, charset = null) {
  bin = bin.toString();
  if (charset === null) {
    let bins2 = Split(bin, 16);
    let decimals = bins2.map((b) => parseInt(b, 2));
    return String.fromCodePoint([...decimals].reverse()).toString();
  }
  while (bin.slice(0, 1) === "0" && bin.length > 1) {
    bin = bin.slice(1);
  }
  let decimal = "0";
  let bins = [...bin.split("")].reverse();
  for (let i = 0; i < bin.length; i++) {
    if (bins[i] === "1") {
      let pow = Power(2, i);
      decimal = Add(decimal, pow);
    }
  }
  return FromDecimal(decimal, charset);
};
var FromBinary = BinaryToAny;
var BinaryToDecimal = function(bin) {
  bin = bin.toString();
  let decimal = "0";
  let bins = [...bin.split("")].reverse();
  for (let i = 0; i < bin.length; i++) {
    if (bins[i] === "1") {
      let pow = Power(2, i);
      decimal = Add(decimal, pow);
    }
  }
  return decimal;
};
var DecimalToAny = function(decimal, charset = null) {
  decimal = Add(decimal, 0);
  if (charset === null) {
    let bin = FromDecimal(decimal, "01");
    let bins = Split(bin, 16);
    let decimals = bins.map((b) => parseInt(b, 2));
    return String.fromCodePoint([...decimals].reverse()).toString();
  }
  let encoded = "";
  let base = charset.length;
  let cs = charset.split("");
  let index = "0";
  let nextStep = Power(base, Add(index, 1));
  while (true) {
    if (Greater(decimal, nextStep) === nextStep) {
      break;
    } else {
      index = Add(index, 1);
      nextStep = Power(base, Add(index, 1));
    }
  }
  for (let i = index; Greater(i, "0") !== "0"; i = Subtract(i, 1)) {
    let csIndex = cs[1];
    let pow = Power(base, i);
    let greater = Greater(pow, decimal);
    if (greater === pow) {
      encoded += cs[0];
      continue;
    }
    let step = pow;
    let nextStep2 = Add(pow, step);
    while (Greater(decimal, nextStep2) !== nextStep2) {
      pow = nextStep2;
      csIndex = Add(csIndex, 1);
      nextStep2 = Add(pow, step);
    }
    decimal = Subtract(decimal, pow);
    encoded += cs[csIndex];
  }
  return encoded;
};
var FromDecimal = DecimalToAny;
var StringToBytes = function(str) {
  let e = new TextEncoder();
  let arr = e.encode(str);
  return [...arr];
};
var BytesToString = function(...bytes) {
  bytes = bytes.flat().map((b) => parseInt(b));
  bytes = new Uint8Array(bytes);
  let d = new TextDecoder();
  return d.decode(bytes);
};
var SecureRandom = function(min = "0", max = "100") {
  min = Add(min, 0);
  max = Add(max, 0);
  if (min === max) {
    return min;
  }
  let len = Add(Subtract(max, min), 1);
  let num = "";
  while (num.length <= len.length + 1) {
    let bytes = new Uint32Array(10);
    num += [...crypto.getRandomValues(bytes)];
  }
  num = num.slice(0, len.length + 2);
  return Add(Mod(num, len), min);
};
var Random = SecureRandom;
var Xor = function(a, b) {
  a = DecimalToAny(a, "01");
  b = DecimalToAny(b, "01");
  a = Zeros(a, b.length);
  b = Zeros(b, a.length);
  a = a.split("");
  b = b.split("");
  let res = "";
  for (let i = "0"; i < Math.max(a.length, b.length); i++) {
    res += (+(a[i] ?? 0) ^ +(b[i] ?? 0)).toString();
  }
  return BinaryToDecimal(res);
};
var Bmi = function(weight, height) {
  return Divide(weight, Power(height, 2), 2);
};
var RoundUp = function(input, factor) {
  input = input.toString();
  factor = factor.toString().replace("-", "");
  let mod = Mod(input, factor).replace("-", "");
  if (input.includes("-")) {
    mod = Subtract(factor, mod);
  }
  return Add(Subtract(input, mod), factor);
};
var RoundDown = function(input, factor) {
  input = input.toString();
  factor = factor.toString().replace("-", "");
  let mod = Mod(input, factor).replace("-", "");
  if (input.includes("-")) {
    mod = Subtract(factor, mod);
  }
  return Subtract(input, mod);
};
var Lcm = function(a, b) {
  a = a.toString().replace("-", "");
  b = b.toString().replace("-", "");
  return Divide(Multiply(a, b), Gcd(a, b));
};
var Gcd = function(a, b) {
  a = a.toString().replace("-", "");
  b = b.toString().replace("-", "");
  return b === "0" ? a : Gcd(b, Mod(a, b));
};
var RangedOperation = function(end, start = "1", step = "1", action = "mul") {
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
  let ret = null;
  let negativeFlag = false;
  a = a.toString();
  b = b.toString();
  if (a.includes(".") && b.includes(".")) {
    let floatA = a.split(".")[1];
    let floatB = b.split(".")[1];
    floatA = Zeros(floatA, floatB.length, "right");
    floatB = Zeros(floatB, floatA.length, "right");
    a = a.split(".")[0] + "." + floatA;
    b = b.split(".")[0] + "." + floatB;
  } else if (a.includes(".")) {
    b += "." + "0".repeat(a.split(".")[1].length);
  } else if (b.includes(".")) {
    a += "." + "0".repeat(b.split(".")[1].length);
  }
  a = a.split("");
  b = b.split("");
  if (a[0] === "-" && b[0] !== "-") {
    ret = b.join("");
  } else if (b[0] === "-" && a[0] !== "-") {
    ret = a.join("");
  } else {
    if (a[0] === "-") {
      a = a.slice(1);
      b = b.slice(1);
      negativeFlag = true;
    }
    if (a.length > b.length) {
      ret = negativeFlag ? "-" + b.join("") : a.join("");
    } else if (a.length < b.length) {
      ret = negativeFlag ? "-" + a.join("") : b.join("");
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== "." && b[i] === ".") {
          ret = negativeFlag ? "-" + b.join("") : a.join("");
          break;
        }
        if (a[i] === "." && b[i] !== ".") {
          ret = negativeFlag ? "-" + a.join("") : b.join("");
          break;
        }
        if (+a[i] > +b[i]) {
          ret = negativeFlag ? "-" + b.join("") : a.join("");
          break;
        }
        if (+a[i] < +b[i]) {
          ret = negativeFlag ? "-" + a.join("") : b.join("");
          break;
        }
      }
    }
  }
  if (ret === null) {
    return true;
  }
  while (ret.includes(".") && ret.slice(ret.length - 1) === "0") {
    ret = ret.slice(0, ret.length - 1);
  }
  if (ret.slice(ret.length - 1) === ".") {
    ret = ret.slice(0, ret.length - 1);
  }
  return ret;
};
var MultiplyOptimizer = function(high, low) {
  const _MultiplyOptimizer = function(high2, low2) {
    let three = low2;
    while (three.length > 1) {
      three = Add(three.split(""));
    }
    three = ["3", "6", "9"].includes(three);
    let five = ["0", "5"].includes(low2.slice(low2.length - 1)) && low2 !== "0";
    let two = ["2", "4", "6", "8"].includes(low2.slice(low2.length - 1));
    if (five) {
      low2 = Divide(low2, 5);
      high2 = Add(high2, high2, high2, high2, high2);
      return _MultiplyOptimizer(high2, low2);
    } else if (three) {
      low2 = Divide(low2, 3);
      high2 = Add(high2, high2, high2);
      return _MultiplyOptimizer(high2, low2);
    } else if (two) {
      low2 = Divide(low2, 2);
      high2 = Add(high2, high2);
      return _MultiplyOptimizer(high2, low2);
    } else {
      return {
        high: high2,
        low: low2
      };
    }
  };
  let ret = _MultiplyOptimizer(high, low);
  return ret;
};
var Multiply = function(...nums) {
  nums = nums.flat();
  if (nums.length < 2) {
    return null;
  }
  let ret1 = nums[0].toString().split(".")[0] ?? "0";
  let ret2 = nums[0].toString().split(".")[1] ?? "0";
  nums = nums.slice(1);
  const _Multiply = function(ret, num) {
    num = Add(num, 0);
    ret = Add(ret, 0);
    if (Add(ret, 0) === "0" || Add(num, 0) === "0") {
      return "0";
    }
    let greater = Greater(ret, num);
    if (greater === num) {
      let temp = num;
      num = ret;
      ret = temp;
    }
    let optimized = MultiplyOptimizer(ret, num);
    let sum = "0";
    while (true) {
      if (Greater("0", optimized.low) !== optimized.low) {
        break;
      }
      sum = Add(sum, optimized.high);
      optimized.low = Subtract(optimized.low, 1);
    }
    return sum;
  };
  const Calc = function(num) {
    let a = num.toString().split(".")[0] ?? "0";
    let b = num.toString().split(".")[1] ?? "0";
    let negativeRet = ret1.slice(0, 1) === "-";
    let negativeNum = a.slice(0, 1) === "-";
    let negative = !negativeRet && negativeNum || negativeRet && !negativeNum;
    ret1 = ret1.replace("-", "");
    a = a.replace("-", "");
    while (ret2.slice(ret2.length - 1) === "0" && ret2.length > 0) {
      ret2 = ret2.slice(0, ret2.length - 1);
    }
    while (b.slice(b.length - 1) === "0" && b.length > 0) {
      b = b.slice(0, b.length - 1);
    }
    ret2 = Zeros(ret2, b.length, "right");
    b = Zeros(b, ret2.length, "right");
    let floatLen = ret2.length * 2;
    let ret3 = ret1 + ret2;
    let ab = a + b;
    let mul = _Multiply(ret3, ab);
    if (mul === "0") {
      ret1 = "0";
      ret2 = "0";
    } else {
      ret1 = mul.slice(0, mul.length - floatLen);
      ret1 = (ret1 === "" ? negative ? "-0" : "0" : negative ? "-" : "") + ret1;
      ret2 = mul.slice(mul.length - floatLen);
    }
  };
  nums.map((num) => Calc(num));
  while (ret2.slice(ret2.length - 1) === "0" && ret2.length > 0) {
    ret2 = ret2.slice(0, ret2.length - 1);
  }
  if (ret2.length === 0) {
    return ret1;
  }
  return [ret1, ret2].join(".");
};
var IsRepeatedPattern = function(str) {
  if (str.length === 0) {
    return false;
  }
  if ("0".repeat(str.length) === str) {
    return false;
  }
  while (true) {
    if (str.slice(0, Math.max(str.length / 2)) === str.slice(Math.max(str.length / 2))) {
      return true;
    }
    if (str.slice(0, 1) === "0") {
      str = str.slice(1);
      continue;
    }
    break;
  }
  return false;
};
var Modulus = function(...nums) {
  nums = nums.flat();
  if (nums.length < 2) {
    return null;
  }
  let ret = nums[0].toString() ?? "0";
  nums = nums.slice(1);
  const _Modulus = function(ret2, num) {
    num = num.toString();
    let negativeRet = ret2.slice(0, 1) === "-";
    let negativeNum = num.slice(0, 1) === "-";
    let negative = negativeRet;
    let _ret = ret2;
    let _num = num;
    ret2 = ret2.replace("-", "");
    num = num.replace("-", "");
    num = num.toString();
    if (Add(ret2, "0") !== "0" && Add(num, "0") === "0") {
      console.error("A modulus of any negative/positive number by zero is invalid.");
      return null;
    }
    let loopValue = "0";
    let rounds = "0";
    let multi = Math.max(ret2.split(".")[0].length - num.split(".")[0].length - 1, 0);
    let floatLen = num.indexOf(".");
    let roundStepSize = "1" + "0".repeat(multi);
    floatLen = floatLen === -1 ? 0 : num.length - floatLen - 1;
    let valueStepSize = floatLen === 0 ? num + "0".repeat(multi) : floatLen <= multi ? num.replace(".", "") + "0".repeat(multi - floatLen) : num.replace(".", "").slice(0, num.replace(".", "").length - floatLen + multi) + "." + num.replace(".", "").slice(num.replace(".", "").length - floatLen + multi);
    while (true) {
      let nextStep = Add(loopValue, valueStepSize);
      let condition = Greater(nextStep, ret2);
      if (condition === true) {
        loopValue = nextStep;
        rounds = Add(rounds, roundStepSize);
        break;
      } else if (condition === ret2) {
        loopValue = nextStep;
        rounds = Add(rounds, roundStepSize);
      } else {
        if (multi === 0) {
          break;
        }
        multi -= 1;
        roundStepSize = "1" + "0".repeat(multi);
        floatLen = valueStepSize.indexOf(".");
        floatLen = floatLen === -1 ? 0 : valueStepSize.length - floatLen - 1;
        valueStepSize = floatLen === 1 && valueStepSize.slice(valueStepSize.length - 1) === "0" ? valueStepSize.slice(0, valueStepSize.length - 2) : valueStepSize.slice(valueStepSize.length - 1) === "0" ? valueStepSize.slice(0, valueStepSize.length - 1) : valueStepSize.replace(".", "").slice(0, valueStepSize.replace(".", "").length - floatLen - 1) + "." + valueStepSize.replace(".", "").slice(valueStepSize.replace(".", "").length - floatLen - 1);
      }
    }
    let rest = Subtract(ret2, loopValue);
    return (negative ? "-" : "") + rest;
  };
  const Calc = function(num) {
    num = num.toString();
    while (num.slice(".")[0].length > 1 && num.slice(0, 1) === "0") {
      num = num.slice(1);
    }
    while (num.includes(".") && num.slice(num.length - 1) === "0") {
      num = num.slice(0, num.length - 1);
    }
    ret = ret === "0" ? "0" : _Modulus(ret, num);
  };
  nums.map((num) => Calc(num));
  return ret;
};
var Mod = Modulus;
var Divide = function(num1, num2, precision = "6") {
  precision = Add(precision, 0);
  let nums = [num1, num2];
  if (nums.length < 2) {
    return null;
  }
  let ret = nums[0].toString() ?? "0";
  nums = nums.slice(1);
  const _Divide = function(ret3, num) {
    num = num.toString();
    let negativeRet = ret3.slice(0, 1) === "-";
    let negativeNum = num.slice(0, 1) === "-";
    let negative = !negativeRet && negativeNum || negativeRet && !negativeNum;
    let _ret = ret3;
    let _num = num;
    ret3 = ret3.replace("-", "");
    num = num.replace("-", "");
    num = num.toString();
    if (Add(ret3, "0") !== "0" && Add(num, "0") === "0") {
      console.error("A division of any negative/positive number by zero is invalid.");
      return null;
    }
    let loopValue = "0";
    let rounds = "0";
    let multi = Math.max(ret3.split(".")[0].length - num.split(".")[0].length - 1, 0);
    let floatLen = num.indexOf(".");
    let roundStepSize = "1" + "0".repeat(multi);
    floatLen = floatLen === -1 ? 0 : num.length - floatLen - 1;
    let valueStepSize = floatLen === 0 ? num + "0".repeat(multi) : floatLen <= multi ? num.replace(".", "") + "0".repeat(multi - floatLen) : num.replace(".", "").slice(0, num.replace(".", "").length - floatLen + multi) + "." + num.replace(".", "").slice(num.replace(".", "").length - floatLen + multi);
    while (true) {
      let nextStep = Add(loopValue, valueStepSize);
      let condition = Greater(nextStep, ret3);
      if (condition === true) {
        loopValue = nextStep;
        rounds = Add(rounds, roundStepSize);
        break;
      } else if (condition === ret3) {
        loopValue = nextStep;
        rounds = Add(rounds, roundStepSize);
      } else {
        if (multi === 0) {
          break;
        }
        multi -= 1;
        roundStepSize = "1" + "0".repeat(multi);
        floatLen = valueStepSize.indexOf(".");
        floatLen = floatLen === -1 ? 0 : valueStepSize.length - floatLen - 1;
        valueStepSize = floatLen === 1 && valueStepSize.slice(valueStepSize.length - 1) === "0" ? valueStepSize.slice(0, valueStepSize.length - 2) : valueStepSize.slice(valueStepSize.length - 1) === "0" ? valueStepSize.slice(0, valueStepSize.length - 1) : valueStepSize.replace(".", "").slice(0, valueStepSize.replace(".", "").length - floatLen - 1) + "." + valueStepSize.replace(".", "").slice(valueStepSize.replace(".", "").length - floatLen - 1);
      }
    }
    if (loopValue !== ret3 && Greater(precision, 0) === precision) {
      let rest = Subtract(ret3, loopValue);
      let numbersAfterDot = "";
      let isRepeatedPattern = false;
      while (isRepeatedPattern === false) {
        let value = "0";
        let counter = "0";
        let max = Multiply(rest, "10");
        let nextValue = Add(value, num);
        while (Greater(nextValue, max) !== nextValue) {
          value = nextValue;
          nextValue = Add(value, num);
          counter = Add(counter, "1");
        }
        numbersAfterDot += counter;
        if (rest === "0" || numbersAfterDot.length >= parseInt(precision)) {
          while (numbersAfterDot.slice(numbersAfterDot.length - 1) === "0") {
            numbersAfterDot = numbersAfterDot.slice(0, numbersAfterDot.length - 1);
          }
          if (numbersAfterDot !== "") {
            numbersAfterDot = "." + numbersAfterDot;
          }
          console.log(`Dividing ${_ret} by ${_num} into ` + (negative ? "-" : "") + `${rounds}${numbersAfterDot}`);
          return (negative ? "-" : "") + `${rounds}${numbersAfterDot}`;
        }
        rest = Subtract(max, value);
        isRepeatedPattern = IsRepeatedPattern(numbersAfterDot);
      }
      return (negative ? "-" : "") + `${rounds}.${numbersAfterDot.slice(0, numbersAfterDot.length / 2)}`;
    }
    return (negative ? "-" : "") + rounds;
  };
  while (ret.slice(".")[0].length > 1 && ret.slice(0, 1) === "0") {
    ret = ret.slice(1);
  }
  while (ret.includes(".") && ret.slice(ret.length - 1) === "0") {
    ret = ret.slice(0, ret.length - 1);
  }
  const Calc = function(num) {
    num = num.toString();
    while (num.slice(".")[0].length > 1 && num.slice(0, 1) === "0") {
      num = num.slice(1);
    }
    while (num.includes(".") && num.slice(num.length - 1) === "0") {
      num = num.slice(0, num.length - 1);
    }
    ret = _Divide(ret, num);
  };
  nums.map((num) => Calc(num));
  let ret1 = ret.split(".")[0] ?? "0";
  let ret2 = ret.split(".")[1] ?? "0";
  while (ret2.length > 0 && ret2.slice(ret2.length - 1) === "0") {
    ret2 = ret2.slice(0, ret2.length - 1);
  }
  if (ret2.length === 0) {
    return ret1;
  }
  return [ret1, ret2].join(".");
};
var Root = function(target, power, precision = "3") {
  target = Add(target, 0).toString();
  power = Add(power, 0).toString();
  precision = Add(precision, 0).toString();
  if (precision.includes(".")) {
    precision = precision.split(".")[0];
  }
  if (precision.includes("-")) {
    precision = precision.replace("-", "");
  }
  if (target.includes("-") && !Divide(power, "2").includes(".")) {
    console.error("Cannot make an even root of a negative number.");
    return null;
  }
  let negativeTarget = target.includes("-");
  let sign = negativeTarget ? "-" : "";
  target = target.replace("-", "");
  let maximumForTesting = Add(Divide(target, power).replace("-", "").split(".")[0], 1);
  if (Greater(maximumForTesting, "2") === "2") {
    maximumForTesting = "2";
  }
  maximumForTesting = maximumForTesting;
  let currentSteper = Zeros("1", maximumForTesting.replace("-", "").length - 1, "right");
  let max = maximumForTesting;
  console.log(`Root: ${target} ; Power: ${power} ; Precision: ${precision}`);
  while (true) {
    console.log(`Root: ${target} ; Power: ${power} ; Attempt: ${max}`);
    let _max = Power(max, power);
    if (_max === target) {
      console.log(`Yey! Found an exact match: ${max}`);
      return sign + max;
    }
    let currentPrecision = (currentSteper.split(".")[1] ?? "").length;
    if (Greater(_max, target) === target) {
      let condition = Greater(currentPrecision, precision);
      if (condition === true) {
        console.log(`Found: ${max} , but will not dive deeper than ${precision} digits.`);
        return sign + max;
      }
      console.log(`Yey! Found: ${max} , Now let's dive deeper...`);
      let nextSteper = Divide(currentSteper, "10");
      max = Add(max, currentSteper);
      max = Subtract(max, nextSteper);
      currentSteper = nextSteper;
    } else {
      console.log(`root ${max} was not matched, keep trying...`);
      max = Subtract(max, currentSteper);
    }
  }
};
var DivisionOptimizer = function(a, b) {
  const _DivisionOptimizer = function(a2, b2) {
    let threeA = a2;
    while (threeA.length > 1) {
      threeA = Add(threeA.split(""));
    }
    threeA = ["3", "6", "9"].includes(threeA);
    let threeB = b2;
    while (threeB.length > 1) {
      threeB = Add(threeA.split(""));
    }
    threeB = ["3", "6", "9"].includes(threeB);
    let fiveA = ["0", "5"].includes(a2.slice(a2.length - 1)) && a2 !== "0";
    let fiveB = ["0", "5"].includes(b2.slice(b2.length - 1)) && b2 !== "0";
    let twoA = ["2", "4", "6", "8"].includes(a2.slice(a2.length - 1));
    let twoB = ["2", "4", "6", "8"].includes(b2.slice(b2.length - 1));
    if (fiveA && fiveB) {
      b2 = Divide(b2, 5);
      a2 = Divide(a2, 5);
      return _DivisionOptimizer(a2, b2);
    } else if (threeA && threeB) {
      b2 = Divide(b2, 3);
      a2 = Divide(a2, 3);
      return _DivisionOptimizer(a2, b2);
    } else if (twoA && twoB) {
      b2 = Divide(b2, 2);
      a2 = Divide(a2, 2);
      return _DivisionOptimizer(a2, b2);
    } else {
      return {
        a: a2,
        b: b2
      };
    }
  };
  let ret = _DivisionOptimizer(a, b);
  return ret;
};
var Power = function(...nums) {
  if (nums.length < 2) {
    return null;
  }
  let ret = nums[0].toString();
  nums = nums.slice(1);
  const _Power = function(ret2, num) {
    num = Add(num, 0);
    ret2 = Add(ret2, 0);
    if (num === "0" && Add(ret2, 0) === "0") {
      console.error("Power of zeros, is invalid.");
      return null;
    } else if (num === "0") {
      return "1";
    } else if (Add(ret2, 0) === "1") {
      return "1";
    } else if (Add(ret2, 0) === "0") {
      return "0";
    }
    let sign = "";
    if (ret2.slice(0, 1) === "-") {
      ret2 = ret2.slice(1);
      if (Divide(num, 2).includes(".")) {
        sign = "-";
      }
    }
    let floatLen = (ret2.split(".")[1] ?? "").length * num;
    ret2 = ret2.replace(".", "");
    num = Subtract(num, 1);
    let sum = ret2;
    while (true) {
      if (Greater("0", num) !== num) {
        break;
      }
      sum = Multiply(sum, ret2);
      num = Subtract(num, 1);
    }
    sum = sum.replace(".", "");
    let n1 = sum.slice(0, sum.length - floatLen);
    let n2 = "." + sum.slice(sum.length - floatLen);
    return sign + (n1 === "" ? "0" : n1) + (n2 === "." ? "" : n2);
  };
  const Calc = function(num) {
    console.log(`Calculating: ${ret} ** ${num}`);
    let a = num.toString().split(".")[0] ?? "0";
    let b = num.toString().split(".")[1] ?? "0";
    let negativeNum = a.slice(0, 1) === "-";
    a = a.replace("-", "");
    if (b !== "0") {
      if (ret.includes("-")) {
        console.log("A negative number, to the power of a float, is invalid.");
        return null;
      }
      let pow = _Power(ret, a);
      let n1 = "1" + "0".repeat(b.length);
      let n2 = b;
      let n = DivisionOptimizer(n1, n2);
      n1 = n.a;
      n2 = n.b;
      let root = Root(ret, n1);
      let factor = Power(root, n2);
      ret = Multiply(_Power(ret, a), factor);
    } else {
      ret = _Power(ret, a);
    }
    if (negativeNum) {
      let _ret = ret;
      ret = Divide(1, ret);
      console.log(`Transforming: ${_ret} ==> ${ret} (Reason: negative power)`);
    }
  };
  nums.map((num) => Calc(num));
  return ret;
};
var Add = function(...nums) {
  nums = nums.flat();
  if (nums.length < 2) {
    return null;
  }
  let ret1 = nums[0].toString().split(".")[0] ?? "0";
  let ret2 = nums[0].toString().split(".")[1] ?? "0";
  nums = nums.slice(1);
  if (ret1.slice(0, 1) === "-") {
    ret2 = "-" + ret2;
  }
  const _Add = function(ret, num) {
    if (!Array.isArray(ret)) {
      ret = [...ret.toString().split("")].reverse();
    }
    if (!Array.isArray(num)) {
      num = [...num.toString().split("")].reverse();
    }
    let negativeResult = null;
    let retIsNegative = null;
    let numIsNegative = null;
    let greater = null;
    greater = Greater([...ret].reverse().join(""), 0);
    if (greater === "0") {
      retIsNegative = true;
      ret = ret.slice(0, ret.length - 1);
    } else {
      retIsNegative = false;
    }
    greater = Greater([...num].reverse().join(""), 0);
    if (greater === "0") {
      numIsNegative = true;
      num = num.slice(0, num.length - 1);
    } else {
      numIsNegative = false;
    }
    greater = Greater([...ret].reverse().join(""), [...num].reverse().join(""));
    if (retIsNegative && numIsNegative || retIsNegative && !numIsNegative && greater === [...ret].reverse().join("") || !retIsNegative && numIsNegative && greater === [...num].reverse().join("")) {
      negativeResult = true;
    } else {
      negativeResult = false;
    }
    let carry = 0;
    for (let i = 0; i < Math.max(ret.length, num.length); i++) {
      if (!retIsNegative && numIsNegative) {
        ret = [...Subtract([...ret].reverse().join(""), [...num].reverse().join("")).split("")].reverse();
        if (ret[ret.length - 1] === "-") {
          ret.pop();
        }
        break;
      } else if (retIsNegative && !numIsNegative) {
        ret = [...Subtract([...num].reverse().join(""), [...ret].reverse().join("")).split("")].reverse();
        if (ret[ret.length - 1] === "-") {
          ret.pop();
        }
        break;
      } else {
        let sum = [...(parseInt(ret[i] ?? 0) + carry + parseInt(num[i] ?? 0)).toString().split("")].reverse();
        ret[i] = sum[0];
        carry = sum[1] ? 1 : 0;
      }
    }
    if (carry === 1) {
      ret.push("1");
    }
    while (ret[ret.length - 1] === "0" && ret.length > 1) {
      ret = ret.slice(0, ret.length - 1);
    }
    if (negativeResult) {
      ret.push("-");
    }
    return [...ret].reverse().join("");
  };
  const Calc = function(num) {
    let sign = ret1.slice(0, 1) === "-" ? "-" : "";
    ret2 = ret2.replace("-", "");
    let a = num.toString().split(".")[0] ?? "0";
    let b = num.toString().split(".")[1] ?? "0";
    ret2 = Zeros(ret2, b.length, "right");
    b = Zeros(b, ret2.length, "right");
    if (a.slice(0, 1) === "-" && b !== 0) {
      b = "-" + b;
    }
    ret1 = _Add(ret1, a);
    let floatLen = ret2.length;
    let test = _Add(sign + ret2, b);
    if (test.slice(0, 1) !== "-") {
      test = Zeros(test, floatLen);
    }
    if (test.replace("-", "").length > ret2.length) {
      if (test.includes("-")) {
        ret1 = "-" + Add(ret1.replace("-", ""), "1");
        test = "-" + test.slice(2);
      } else {
        ret1 = Add(ret1, "1");
        test = test.slice(1);
      }
    }
    if (test.slice(0, 1) === "-") {
      test = test.replace("-", "");
      if (ret1.slice(0, 1) !== "-") {
        ret1 = Subtract(ret1, "1");
        test = Subtract("1" + "0".repeat(ret2.length), test);
      }
    } else if (ret1.slice(0, 1) === "-" && Add(test, 0) !== "0") {
      ret1 = Add(ret1, "1");
      if (!ret1.includes("-")) {
        ret1 = "-" + ret1;
      }
      test = Subtract("1" + "0".repeat(ret2.length), test);
    }
    test = Zeros(test, ret2.length);
    ret2 = test;
  };
  nums.map((num) => Calc(num));
  while (ret2.slice(ret2.length - 1) === "0" && ret2.length > 0) {
    ret2 = ret2.slice(0, ret2.length - 1);
  }
  if (ret2.length === 0) {
    return ret1;
  }
  return [ret1, ret2].join(".");
};
var Subtract = function(...nums) {
  nums = nums.flat();
  if (nums.length < 2) {
    return null;
  }
  let ret1 = nums[0].toString().split(".")[0] ?? "0";
  let ret2 = nums[0].toString().split(".")[1] ?? "0";
  nums = nums.slice(1);
  if (ret1.slice(0, 1) === "-") {
    ret2 = "-" + ret2;
  }
  const _Subtract = function(ret, num) {
    if (!Array.isArray(ret)) {
      ret = [...ret.toString().split("")].reverse();
    }
    if (!Array.isArray(num)) {
      num = [...num.toString().split("")].reverse();
    }
    let negativeResult = null;
    let retIsNegative = null;
    let numIsNegative = null;
    let greater = null;
    greater = Greater([...ret].reverse().join(""), 0);
    if (greater === "0") {
      retIsNegative = true;
      ret = ret.slice(0, ret.length - 1);
    } else {
      retIsNegative = false;
    }
    greater = Greater([...num].reverse().join(""), 0);
    if (greater === "0") {
      numIsNegative = true;
      num = num.slice(0, num.length - 1);
    } else {
      numIsNegative = false;
    }
    greater = Greater([...ret].reverse().join(""), [...num].reverse().join(""));
    if (retIsNegative && numIsNegative && greater !== [...num].reverse().join("") || retIsNegative && !numIsNegative || !retIsNegative && !numIsNegative && greater === [...num].reverse().join("")) {
      negativeResult = true;
    } else {
      negativeResult = false;
    }
    if (greater === [...num].reverse().join("")) {
      let _num = num;
      num = ret;
      ret = _num;
    }
    let carry = 0;
    for (let i = 0; i < Math.max(ret.length, num.length); i++) {
      if (!retIsNegative && numIsNegative || retIsNegative && !numIsNegative) {
        ret = [...Add([...ret].reverse().join(""), [...num].reverse().join("")).split("")].reverse();
        break;
      } else {
        let diff = [...(parseInt(ret[i] ?? 0) - carry - parseInt(num[i] ?? 0)).toString().split("")].reverse();
        ret[i] = diff.length === 3 ? "0" : diff.length === 2 ? 10 - +diff[0] : diff[0];
        carry = diff.length > 1 ? 1 : 0;
      }
    }
    while (ret[ret.length - 1] === "0" && ret.length > 1) {
      ret = ret.slice(0, ret.length - 1);
    }
    if (negativeResult) {
      ret.push("-");
    }
    return [...ret].reverse().join("");
  };
  nums.map(function(num) {
    let sign = ret1.slice(0, 1) === "-" ? "-" : "";
    ret2 = ret2.replace("-", "");
    let a = num.toString().split(".")[0] ?? "0";
    let b = num.toString().split(".")[1] ?? "0";
    ret2 = Zeros(ret2, b.length, "right");
    b = Zeros(b, ret2.length, "right");
    if (a.slice(0, 1) === "-" && b !== 0) {
      b = "-" + b;
    }
    ret1 = _Subtract(ret1, a);
    let floatLen = ret2.length;
    let test = _Subtract(sign + ret2, b);
    if (test.slice(0, 1) !== "-") {
      test = Zeros(test, floatLen);
    }
    if (test.replace("-", "").length > ret2.length) {
      if (test.includes("-")) {
        ret1 = "-" + Add(ret1.replace("-", ""), "1");
        test = "-" + test.slice(2);
      } else {
        ret1 = Add(ret1, "1");
        test = test.slice(1);
      }
    }
    if (test.slice(0, 1) === "-") {
      test = test.replace("-", "");
      if (ret1.slice(0, 1) !== "-") {
        ret1 = Subtract(ret1, "1");
        test = Subtract("1" + "0".repeat(ret2.length), test);
      }
    } else if (ret1.slice(0, 1) === "-" && Add(test, 0) !== "0") {
      ret1 = Add(ret1, "1");
      if (!ret1.includes("-")) {
        ret1 = "-" + ret1;
      }
      test = Subtract("1" + "0".repeat(ret2.length), test);
    }
    test = Zeros(test, ret2.length);
    ret2 = test;
  });
  while (ret2.slice(ret2.length - 1) === "0" && ret2.length > 0) {
    ret2 = ret2.slice(0, ret2.length - 1);
  }
  if (ret2.length === 0) {
    return ret1;
  }
  return [ret1, ret2].join(".");
};
var AddUnsignedBinary = function(...bins) {
  bins = [bins].flat().flat();
  bins = bins.map((bin) => bin.toString().split("").reverse());
  let ret = bins[0];
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
var AddBinary = AddUnsignedBinary;
export {
  Add,
  AddBinary,
  AddUnsignedBinary,
  AnyToDecimal,
  Bases,
  BinaryToAny,
  BinaryToDecimal,
  Bmi,
  BytesToString,
  CountDiffBits,
  CountSetBits,
  DecimalToAny,
  Divide,
  Fibonacci,
  FromBinary,
  FromDecimal,
  Gcd,
  GetBit,
  Greater,
  Lcm,
  MeasureBits,
  Mod,
  Modulus,
  Multiply,
  Power,
  Random,
  RangedOperation,
  Root,
  RoundDown,
  RoundUp,
  SecureRandom,
  StringToBytes,
  Subtract,
  ToDecimal,
  Xor,
  Zeros,
  base62,
  base64,
  hex
};
