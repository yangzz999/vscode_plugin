const vscode = require('vscode');
const CourseTreeProvider_1 = require("./src/CourseTreeProvider");

exports.activate = function(context,relativePath) {
	console.log('您的扩展“webview demo”已被触发！')
	CourseTreeProvider_1.MyTreeProvider.initMyTreeList();
	require('./src/webview')(context);
	require('./src/webview2')(context);
	require('./src/webview3')(context);


};
exports.deactivate = function() {
    console.log('您的扩展“webview demo”已被释放！')
};