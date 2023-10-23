import { Divide } from "../basic/Divide.js";
import { Add } from "../basic/Add.js";

export const MultiplyOptimizer = function(high,low){
	const _MultiplyOptimizer = function(high,low){
		let three = low;
		while( three.length > 1 ){
			three = Add( three.split("") );
		}
		three = ["3","6","9"].includes( three );
		let five = ["0","5"].includes( low.slice(low.length-1) ) && low !== "0";
		let two = ["2","4","6","8"].includes( low.slice(low.length-1) );
		if( five ){
			low = Divide( low, 5 );
			high = Add( high, high, high, high, high );
			return _MultiplyOptimizer(high,low);
		} else if( three ){
			low = Divide( low, 3 );
			high = Add( high, high, high );
			return _MultiplyOptimizer(high,low);
		} else if( two ){
			low = Divide( low, 2 );
			high = Add( high, high );
			return _MultiplyOptimizer(high,low);
		} else {
			return {
				high: high,
				low: low
			};
		}
	}
	let ret = _MultiplyOptimizer(high,low);
	return ret;
}