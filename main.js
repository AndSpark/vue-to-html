const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

let serverBundle = require(path.resolve(
	__dirname,
	'./dist/vue-ssr-server-bundle.json'
))
let clientManifest = require(path.resolve(
	__dirname,
	'./dist/vue-ssr-client-manifest.json'
))
let template = fs.readFileSync(
	path.resolve(__dirname, './dist/index.ssr.html'),
	'utf-8'
)
let renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest,
})
let ctx = { url: '/' }
renderer.renderToString(ctx).then(html => {
	fs.writeFileSync(path.join(__dirname, './dist', 'index.html'), html)
})
