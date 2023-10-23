import { MeasureBits } from "../binary/MeasureBits.js";
import { RoundUp } from "../round/RoundUp.js";
import { FromDecimal } from "./FromDecimal.js";
import { ToDecimal } from "./ToDecimal.js";
import { FromBinary } from "./FromBinary.js";
import { StringToBytes } from "../unicode/StringToBytes.js";
import { BytesToString } from "../unicode/BytesToString.js";
import { Zeros } from "../utils/Zeros.js";
import { Split } from "../utils/Split.js";

export const Bases = function( str, from, to, padding = "" ){

	str = str.toString();
	from = from === null ? from : from.toString();
	to = to === null ? to : to.toString();

	let toLength = to === null ? null : to.length;
	if (typeof toLength === "number" && toLength < 2) {
		return null;
	}
	let toBits = toLength === null ? null : MeasureBits(toLength);
	let toFloatBits = toLength === null ? null : MeasureBits(toLength,false);
	let toSize = toBits === null ? null : RoundUp(toBits,8) / toBits;
	let toFloat = toFloatBits !== parseInt(toFloatBits);

	let fromLength = from === null ? null : from.length;
	if (typeof fromLength === "number" && fromLength < 2) {
		return null;
	}
	let fromBits = fromLength === null ? null : MeasureBits(fromLength);
	let fromFloatBits = fromLength === null ? null : MeasureBits(fromLength,false);
	let fromSize = fromBits === null ? null : RoundUp(fromBits,8) / fromBits;
	let fromFloat = fromFloatBits !== parseInt(fromFloatBits);

	let num = "";
	let out = [];

	if( from === to ){
		return str;
	}

	if( from !== null ){
		let re = new RegExp( '(' + padding + '){1,}$' , 'g' );
		str = str.replaceAll( re, "" );
	}

	if( from !== null && to !== null ){

		if( from === "0123456789" ){
			out = FromDecimal(str,to);
		} else if( to === "0123456789" ){
			out = ToDecimal(str,from);
		} else {
			out = FromDecimal( ToDecimal(str,from), to);
		}

	} else if( from === null && to !== null && toFloat === true ){

		let bytes = StringToBytes(str);
		let hex = bytes.map( byte => byte.toString(16) ).join("");
		let deci = ToDecimal(hex.toUpperCase(),"0123456789ABCDEF");
		out = FromDecimal(deci,to);

	} else if( from === null && to !== null ){

		let bytes = StringToBytes(str);
		let bin2 = bytes.map( byte => Zeros((+byte).toString(2),8) ).join("");

		let bin = bin2 + "0".repeat((toBits - bin2.length % toBits) % toBits);
		out =  FromBinary( bin, to );

	} else if( from !== null && to === null && fromFloat === true ){

		out = BytesToString(
			Split(
				FromDecimal(ToDecimal(str, from), "0123456789ABCDEF"),
				2
			).map(
				hx => ToDecimal(hx, "0123456789ABCDEF")
			)
		);

	} else if( from !== null && to === null ){

		let charsLength = Split(str,fromSize).length;

		let bin = DecimalToAny( AnyToDecimal( str, from ), "01" );
		bin = Zeros( bin, RoundUp( bin.length , 8 ) );

		let bytes = Split( bin.slice(0,charsLength*8) , 8 ).map( b => parseInt(b,2) );
		out = BytesToString(bytes);
	}

	if( toSize !== null ){
		out += padding.repeat((toSize - out.length % toSize) % toSize);
	}

	return out;
}