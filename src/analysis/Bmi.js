import { Divide } from "../basic/Divide.js";
import { Power } from "../basic/Power.js";

export const Bmi = function(weight,height){
	return Divide( weight, Power(height,2), 2 );
}