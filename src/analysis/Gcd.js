import { Mod } from "../basic/Mod.js";

export const Gcd = function(a, b){
	a = a.toString().replace("-","");
	b = b.toString().replace("-","");
	return b === "0" ? a : Gcd(b, Mod(a,b));
};