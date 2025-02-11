<!-- @format -->
[返回上一级](./README.md)

## 启动本地开发环境

```bash
# 安装依赖
pnpm install

# 启动服务
pnpm dev
```

也可以使用 npm 或 yarn 安装依赖和启动服务。

> 为什么启动使用 dev 命令？

这是一个前端项目的常识，我们拿到一个新的前端项目时，第一时间去看一下 packpage.json 文件，就可以看看这个项目的依赖和命令。

在 scripts 下就有这个项目预设的一些的命令脚本。

```json
  "scripts": {
    "bootstrap": "pnpm install",
    "serve": "pnpm run dev",
    "dev": "vite",
    "build": "vite build && esno ./build/script/postBuild.ts",
    // 省略其他代码
  }
```

所以，安装好依赖包之后，我们可以直接使用 dev 命令来启动服务。

我们还可以使用 pnpm serve 来启动服务，这是因为我们在 scripts 下定义了一个 serve 命令，它的作用就是运行 dev 命令。

应该是为了方便我们使用。
