export const Split = function(inp, num) {
	inp = inp.toString();
	var out = [];
	for (var i = 0; i < inp.length; i += num) {
		out.push(inp.slice(i, i + num))
	}
	return out
}