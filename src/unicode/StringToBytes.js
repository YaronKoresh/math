export const StringToBytes = function(str){
	let arr = [];
	let index = 0;
	while(true){
		let byte = str.codePointAt(index);
		if( typeof byte === "undefined" ){
			break;
		}
		arr.push(byte);
		index++;
	}
	return arr;
};