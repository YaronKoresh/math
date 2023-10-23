export const StringToBytes = function(str){
	let e = new TextEncoder();
	let arr = e.encode(str);
	return [...arr];
};