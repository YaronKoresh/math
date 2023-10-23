export const AddUnsignedBinary = function(...bins) {
	bins = [bins].flat().flat();
	bins = bins.map( bin => bin.toString().split("").reverse() );
	let ret = bins[0];
	bins = bins.slice(1);
	const _AddBinary = function(bin){
		let carry = 0;
		let i = 0;
		while(true){
			let sum = (carry + parseInt(bin[i] ?? 0) + parseInt(ret[i] ?? 0)).toString(2).split("").reverse();
			ret[i] = sum[0];
			carry = sum[1] ? parseInt(sum.slice(1).reverse().join(""),2) : 0;
			i++;
			if( i >= bin.length && carry == 0 ){
				break;
			}
		}
	}
	bins.map( bin => _AddBinary(bin) );
	return ret.reverse().join("");
};