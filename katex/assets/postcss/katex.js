import { readFileSync, writeFileSync } from "node:fs";
import { join } from "path";
import { renderToString } from "katex";

const publicDir = "public";

const jsonPath = join(publicDir, "katex.json");
const jsonFile = readFileSync(jsonPath);
const files = JSON.parse(jsonFile);
for (let i = 0; i < files.length; i++) {
	const file = join(publicDir, files[i].replace(".md", ".html"));
	const html = parseMath(file);
	writeFileSync(file, html);
}

function parseInlineMath(html) {
	return html
		.replace(/\$(.*?)\$/g, function (_outer, inner) {
			return renderToString(inner, { throwOnError: false });
		})
		.replace(/\\\((.*?)\\\)/g, function (_outer, inner) {
			return renderToString(inner, { throwOnError: false });
		});
}

function parseMathBlocks(html) {
	return html
		.replace(/\$\$(.*?)\$\$/g, function (_outer, inner) {
			return renderToString(inner, {
				throwOnError: false,
				displayMode: true,
			});
		})
		.replace(/\\\[(.*?)\\\]/g, function (_outer, inner) {
			return renderToString(inner, {
				throwOnError: false,
				displayMode: true,
			});
		});
}

function parseMath(file) {
	const html = readFileSync(file, "utf8");
	const out = parseMathBlocks(html);
	return parseInlineMath(out);
}

const plugin = () => {
	return { postcssPlugin: "postcss-katex" };
};
plugin.postcss = true;

export default plugin;
