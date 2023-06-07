import "katex";
import renderMathInElement from "katex/contrib/auto-render";

renderMathInElement(document.body, {
	delimiters: [
		{ left: "$$", right: "$$", display: true },
		{ left: "$", right: "$", display: false },
		{ left: "\\(", right: "\\)", display: false },
		{ left: "\\[", right: "\\]", display: true },
	],
	throwOnError: false,
});
