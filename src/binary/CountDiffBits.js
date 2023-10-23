import { Xor } from "./Xor.js";
import { CountSetBits } from "./CountSetBits.js";

export const CountDiffBits = function(a, b) {
	return CountSetBits(Xor(a,b));
}