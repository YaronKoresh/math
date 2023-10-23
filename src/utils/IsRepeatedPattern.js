export const IsRepeatedPattern = function(str){
	if( str.length === 0 ){
		return false;
	}
	if( "0".repeat( str.length ) === str ){
		return false;
	}
	while(true){
		if( str.slice( 0, Math.max(str.length/2) ) === str.slice( Math.max(str.length/2) ) ){
			return true;
		}
		if( str.slice(0,1) === "0" ){
			str = str.slice(1);
			continue;
		}
		break;
	}
	return false;
}