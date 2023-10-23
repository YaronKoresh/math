import { Gcd } from "./Gcd.js";
import { Divide } from "../basic/Divide.js";
import { Multiply } from "../basic/Multiply.js";

export const Lcm = function(a, b){
	a = a.toString().replace("-","");
	b = b.toString().replace("-","");
	return Divide(Multiply(a,b),Gcd(a,b));
};