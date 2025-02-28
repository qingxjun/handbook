<!-- @format -->
[返回上一级](../README.md)

## 界面布局

界面的布局是一个非常重要的部分，而 Naive UI Admin 提供了两种可配置的布局，基本上可以满足大部分的需求。

接下来，我们就来看看 Naive UI Admin 提供的布局。

它们分别为：

- 左侧导航布局
- 顶部导航布局

不过，现在后台管理系统应该比较流行左侧导航布局。

所以，我们可以去掉顶部导航布局，只保留左侧导航布局。

[了解一下布局的实现](./layout-old.md)

[如何去除顶部导航布局？](./remove-layout-top.md)

通过左侧菜单，我们可以快速进入对应页面，而所有的业务处理工作，都是在右侧的主体页面中进行。

这就需要我们尽量提高主页内容在整个页面中的显示占比，以提高用户的使用体验。

所以，一般来说左侧菜单应该是可以收起的，从而减少菜单占用的空间。

目前左侧导航布局目前的设计空间使用率并不高。

我们可以进行如下改造：

- 多页签并入顶栏，去除面包屑。 [查看详情](./tabs-merge.md)
- 减小或去除不同区域栏之间的间距
