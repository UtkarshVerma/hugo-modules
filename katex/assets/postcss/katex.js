const fs = require('fs')
const katex = require('katex')

const jsonFile = fs.readFileSync('./public/katex.json');
var i, files = JSON.parse(jsonFile)
for (i = 0; i < files.length; i++) {
	var file = './public/' + files[i].replace('.md', '.html')
	var html = parseMath(file)
	fs.writeFileSync(file, html)
}

function parseInlineMath(html) {
	return html.replace(/\$(.*?)\$/g, function (outer, inner) {
		return katex.renderToString(inner, { throwOnError: false })
	})
}

function parseMathBlocks(html) {
	return html.replace(/\$\$(.*?)\$\$/gm, function (outer, inner) {
		return katex.renderToString(inner, { throwOnError: false, displayMode: true })
	})
}

function parseMath(file) {
	var html = fs.readFileSync(file, 'utf8')
	var out = parseMathBlocks(html)
	return parseInlineMath(out)
}

module.exports = () => { return { postcssPlugin: 'postcss-katex' } }
module.exports.postcss = true
