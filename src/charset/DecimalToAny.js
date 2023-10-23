import { Split } from "../utils/Split.js";
import { Power } from "../basic/Power.js";
import { Add } from "../basic/Add.js";
import { Greater } from "../basic/Greater.js";
import { Subtract } from "../basic/Subtract.js";

export const DecimalToAny = function(decimal,charset = null){

	decimal = Add(decimal,0);

	if( charset === null ){
		let bin = DecimalToAny(decimal,"01");
		let bins = Split( bin, 16 );
		let decimals = bins.map( b => parseInt(b,2) );
		return String.fromCodePoint([...decimals].reverse()).toString();
	}

	let encoded = "";
	let base = charset.length;
	let cs = charset.split("");
	let index = "0";
	let nextStep = Power(base,Add(index,1));
	while( true ){
		if( Greater(decimal,nextStep) === nextStep ){
			break;
		} else {
			index = Add(index,1);
			nextStep = Power(base,Add(index,1));
		}
	}
	for( let i = index ; Greater(i,"0") !== "0" ; i = Subtract(i,1) ){
		let csIndex = 1;
		let pow = Power( base, i );
		let greater = Greater( pow,decimal );
		if( greater === pow ){
			encoded += cs[0];
			continue;
		}
		let step = pow;
		let nextStep = Add( pow, step );
		while( Greater(decimal,nextStep) !== nextStep ){
			pow = nextStep;
			csIndex = Add(csIndex,1);
			nextStep = Add( pow, step );
		}
		decimal = Subtract(decimal,pow);
		encoded += cs[csIndex];
	}
	return encoded;
}