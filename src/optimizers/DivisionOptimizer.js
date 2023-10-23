import { Divide } from "../basic/Divide.js";

export const DivisionOptimizer = function(a,b){
	const _DivisionOptimizer = function(a,b){

		let threeA = a;
		while( threeA.length > 1 ){
			threeA = Add( threeA.split("") );
		}
		threeA = ["3","6","9"].includes( threeA );

		let threeB = b;
		while( threeB.length > 1 ){
			threeB = Add( threeA.split("") );
		}
		threeB = ["3","6","9"].includes( threeB );

		let fiveA = ["0","5"].includes( a.slice(a.length-1) ) && a !== "0";

		let fiveB = ["0","5"].includes( b.slice(b.length-1) ) && b !== "0";

		let twoA = ["2","4","6","8"].includes( a.slice(a.length-1) );

		let twoB = ["2","4","6","8"].includes( b.slice(b.length-1) );

		if( fiveA && fiveB ){
			b = Divide( b, 5 );
			a = Divide( a, 5 );
			return _DivisionOptimizer(a,b);
		} else if( threeA && threeB ){
			b = Divide( b, 3 );
			a = Divide( a, 3 );
			return _DivisionOptimizer(a,b);
		} else if( twoA && twoB ){
			b = Divide( b, 2 );
			a = Divide( a, 2 );
			return _DivisionOptimizer(a,b);
		} else {
			return {
				a: a,
				b: b
			};
		}
	}
	let ret = _DivisionOptimizer(a,b);
	return ret;
}