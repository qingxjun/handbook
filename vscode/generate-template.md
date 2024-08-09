[返回首页](/README.md)

[返回上一页](./README.md)

# generate template 生成模板

完成上一步的复制功能之后，我们接下来实现一下生成模板功能

生成模板功能主要可以应用于项目中的一个比较通用的页面、表单或组件之类的场景

可以想像一下这样的交互：

1. 选择一个希望生成为模板的文件或文件夹

2. 触发【生成模板】指令

3. 模板生成成功！

#### 取得 Explorer 选中的文件或文件夹

通过直接执行指令的方式是无法取得选中的文件或文件夹，

不过，我们可以通过配置右键菜单选项的方式，配置如下：

```json
"contributes": {
    "commands": [
      {
        "command": "generate-template.generate",
        "title": "GT: generate"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "generate-template.generate"
        }
      ]
    }
  },
```

通过配置 menus 的 explorer/context ，当我们选中 explorer 文件列表中的文件或文件夹右键的菜单中，就会出现我们配置好的选项 GT: generate 。

当我们选择右键菜单中的对应选项时，注册指令的回调函数就可以接收一个 uri 对象。

```ts
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('generate-template.generate', (uri) => {
    console.log('uri', uri)
    vscode.window.showInformationMessage('generate success!')
  })

  context.subscriptions.push(disposable)
}


export function deactivate() {}
```

这个 uri 就是我们需要的文件或文件夹地址。

#### 生成模板

前两步已经完成，最后一步生成模板也很简单。

不需要把模板想的太复杂，

我们现在只需要先完成将选中目标复制一份保存到指定位置的功能。

```ts
const disposable = vscode.commands.registerCommand('generate-template.generate', async (uri: vscode.Uri) => {
	console.log('test', uri)

	if (uri) {
		// 模板文件保存在当前项目根目录下的 .template 文件夹里
		if (!vscode.workspace.workspaceFolders) {
			vscode.window.showWarningMessage('先打开一个项目')
			return
		}

		const root = vscode.workspace.workspaceFolders!
		const first = root[0]
		const tmpPath = vscode.Uri.joinPath(first.uri, '.template')

		const oldPathParsed = path.parse(uri.path)
		const oldFileStat = await vscode.workspace.fs.stat(uri)

		if (oldFileStat.type === vscode.FileType.File) {
			// 复制文件
			await vscode.workspace.fs.copy(uri, vscode.Uri.joinPath(tmpPath, oldPathParsed.name + oldPathParsed.ext), {
				overwrite: true,
			})
		} else if (oldFileStat.type === vscode.FileType.Directory) {
			// 复制文件夹
			await vscode.workspace.fs.copy(uri, vscode.Uri.joinPath(tmpPath, oldPathParsed.name), {
				overwrite: true,
			})
		} else {
			// 其它
			vscode.window.showWarningMessage('请选中要生成模板的文件或文件夹')
			return
		}

		vscode.window.showInformationMessage('generate success!')
	} else {
		vscode.window.showWarningMessage('请选中要生成模板的文件或文件夹')
	}
})
```

主要处理了文件与文件夹的复制策略，毕竟文件才有扩展名。

现在，我们只需要选中要做成模板的文件或文件夹，然后选择生成选项，就可以将其复制到指定的 .template 目录里。

