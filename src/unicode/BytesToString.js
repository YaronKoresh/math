export const BytesToString = function(...bytes){
	bytes = bytes.flat().map( b => parseInt(b) );
	return String.fromCodePoint(...bytes);
};