const vscode = require('vscode');
const util = require('./util');
const fs = require('fs');
const path = require('path');


function getWebViewContent(context, templatePath) {
    console.log('templatePath',templatePath)
    
    const resourcePath = util.getExtensionFileAbsolutePath(context, templatePath);
    console.log('resourcePath',resourcePath)

    const dirPath = path.dirname(resourcePath);
    console.log('dirPath',dirPath)

    let html = fs.readFileSync(resourcePath, 'utf-8');
    console.log('html',html)
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({
            scheme: 'vscode-resource'
        }).toString() + '"';
    });
    return html;
}

module.exports = function (context){
    console.log('first context',context)
    context.subscriptions.push(vscode.commands.registerCommand('extension.openwv3', function(uri){
        var panel = vscode.window.createWebviewPanel(
            "webview", 
            "y content",
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                enableFindWidget: true
            }
        );
        panel.webview.html = getWebViewContent(context,'src/view/webview3.html')
        panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {

				case 'openHint':
					vscode.window.showInformationMessage(message.text, {
						modal: true
					});
					break;
			}

        }, undefined, context.subscriptions);
    }));
};