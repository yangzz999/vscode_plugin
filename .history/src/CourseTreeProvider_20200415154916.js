const vscode = require ('vscode');

class MyTreeProvider {
    constructor() {}
    static initMyTreeList() {
        let myTreeProvider = new MyTreeProvider();
        vscode.window.registerTreeDataProvider("test_ID", myTreeProvider);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let trees = [];
        let temp1 = new vscode.TreeItem("y1");
        let temp2 = new vscode.TreeItem("y2");
        let temp3 = new vscode.TreeItem("y3");
        let temp4 = new vscode.TreeItem("y4");
        trees.push(temp1,temp2,temp3,temp4)

        vscode.commands.executeCommand('extension.openwv2')

        return new Promise(resolve =>{
            return resolve(trees);
        });
    }
}
exports.MyTreeProvider = MyTreeProvider;