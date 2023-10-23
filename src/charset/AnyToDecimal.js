import { Power } from "../basic/Power.js";
import { Add } from "../basic/Add.js";
import { Multiply } from "../basic/Multiply.js";

export const AnyToDecimal = function(str,charset = null){

	str = str.toString();

	let ret = [];

	if( charset === null ){
		for( let i = 0 ; true ; i++ ){
			if( typeof str.codePointAt(i) === "undefined" ){
				while(true){
					if( ret.length > 1 && ret[0] === "0" ){
						ret = ret.slice(1);
					} else {
						return ret.join("");
					}
				}			
			}
			let char = str.split("")[i];
			ret.push( str.codePointAt(i) );
		}
	}

	for( let i = str.length-1 ; i >= 0 ; i-- ){
		let char = str.slice(0,1);
		str = str.slice(1);
		let value = Multiply(Power( charset.length, i ), charset.indexOf(char) );
		ret.push( value );
	}

	return Add(ret,0);
};