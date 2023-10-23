export const Zeros = function( str, len, side = "left" ){
	str = str.toString();
	while (str.length < len) {
		if( side.toLowerCase() === "left" ){
			str = '0' + str;
		} else if( side.toLowerCase() === "right" ){
			str = str + '0';
		}
	}
	return str
}