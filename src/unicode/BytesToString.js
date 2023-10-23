export const BytesToString = function(...bytes){
	bytes = bytes.flat().map( b => parseInt(b) );
	bytes = new Uint8Array(bytes);
	let d = new TextDecoder();
	return d.decode(bytes);
};