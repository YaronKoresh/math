import { Zeros } from "../utils/Zeros.js";

export const Greater = function(a,b){
	let ret = null;
	let negativeFlag = false;
	a = a.toString();
	b = b.toString();
	if( a.includes(".") && b.includes(".") ){
		let floatA = a.split(".")[1];
		let floatB = b.split(".")[1];
		floatA = Zeros( floatA, floatB.length, "right" );
		floatB = Zeros( floatB, floatA.length, "right" );
		a = a.split(".")[0] + "." + floatA;
		b = b.split(".")[0] + "." + floatB;
	} else if( a.includes(".") ){
		b += "." + ("0").repeat( a.split(".")[1].length );
	} else if( b.includes(".") ){
		a += "." + ("0").repeat( b.split(".")[1].length );
	}
	a = a.split("");
	b = b.split("");
	if( a[0] === "-" && b[0] !== "-" ){
		ret = b.join("");
	} else if( b[0] === "-" && a[0] !== "-" ){
		ret = a.join("");
	} else {
		if( a[0] === "-" ){
			a = a.slice(1);
			b = b.slice(1);
			negativeFlag = true;
		}
		if( a.length > b.length ){
			ret = negativeFlag ? "-" + b.join("") : a.join("");
		} else if( a.length < b.length ){
			ret = negativeFlag ? "-" + a.join("") : b.join("");
		} else {
			for( let i = 0 ; i < a.length ; i++ ){
				if( a[i] !== "." && b[i] === "." ){
					ret = negativeFlag ? "-" + b.join("") : a.join("");
					break;
				}
				if( a[i] === "." && b[i] !== "." ){
					ret = negativeFlag ? "-" + a.join("") : b.join("");
					break;
				}
				if( +a[i] > +b[i] ){
					ret = negativeFlag ? "-" + b.join("") : a.join("");
					break;
				}
				if( +a[i] < +b[i] ){
					ret = negativeFlag ? "-" + a.join("") : b.join("");
					break;
				}
			}
		}
	}
	if( ret === null ){
		return true;
	}
	while( ret.includes(".") && ret.slice(ret.length-1) === "0" ){
		ret = ret.slice(0,ret.length-1);
	}
	if( ret.slice(ret.length-1) === "." ){
		ret = ret.slice(0,ret.length-1);
	}
	return ret;
}