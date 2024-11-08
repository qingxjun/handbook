[返回上一级](./README.md)

# GitHub 访问慢

作为国内的用户，我相信绝大多数的家人们都遇到过一个问题，那就是访问github的时候非常非常慢。

甚至有的时候访问网站页面直接死掉。

这个时候该有人说了，我有梯子我不怕，上网速度嗖嗖的。

但是如果我们不使用梯子的情况下该怎么办呢？毕竟使用github也是我们的日常。

## 方式一

github.global.ssl.fastly.net.ipaddress.com/#ipinfo 
访问这个网址。会得到CDN和IP地址，对应github.com

github.com.ipaddress.com/#ipinfo 
访问这个网址，会得到CDN和IP地址，对应github.global.ssl.fastly.net。

然后再host中添加配置：

```shell
140.82.112.3 github.com
151.101.1.194 github.global.ssl.fastly.net
```

由于 ip 地址是一直在变的，我们可以通过访问 https://www.ipaddress.com/ 取得最新的 ip 地址。