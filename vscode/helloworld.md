# vscode extensions

[返回首页](/README.md)

快速入门，实现一个最基本的插件 —— hello world

我们只需要照着官网的文档就能完成，详见下方链接 ↓

[官网 first-extension](https://code.visualstudio.com/api/get-started/your-first-extension)

若是觉着英语看不太明白，还可以看汉化版文档 ↓

[汉化版 first-extension](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/get-started/your-first-extension)

一般情况下是不会出什么问题的，但经不住运气不太好的同学，总是能遇到一些扎手的问题~~~

## 找不到指令

只需要修改一下 package.json 里的 vscode 版本值：

```json
"engines": {
  "vscode": "^1.90.0"
},
```

将 vscode 值修改为不高于自己机子的 vscode 版本，重新运行一下，就可以了。
