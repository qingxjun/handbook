<!-- @format -->

这些内容是 JavaScript 前端开发中的核心技能，适合在基础语法之后深入学习。

---

## DOM 操作

### 1. 什么是 DOM？

DOM（Document Object Model）是浏览器将 HTML 文档解析成的一个树状结构，JavaScript 可以通过 DOM 操作来动态修改网页内容、结构和样式。

#### DOM 树结构：

- 文档（Document）是根节点。
- 元素（Element）是 HTML 标签。
- 属性（Attribute）是元素的属性。
- 文本（Text）是元素的内容。

---

### 2. 获取 DOM 元素

JavaScript 提供了多种方法来获取 DOM 元素。

#### 通过 `id` 获取：

```javascript
let header = document.getElementById('header')
```

#### 通过 `class` 获取：

```javascript
let items = document.getElementsByClassName('item')
```

#### 通过标签名获取：

```javascript
let paragraphs = document.getElementsByTagName('p')
```

#### 通过 CSS 选择器获取：

```javascript
let button = document.querySelector('#submit-button') // 获取单个元素
let buttons = document.querySelectorAll('.btn') // 获取所有匹配元素
```

#### 注意事项：

- `querySelector` 返回第一个匹配的元素，`querySelectorAll` 返回所有匹配的元素（NodeList）。

---

### 3. 修改 DOM 元素

可以通过 JavaScript 修改元素的内容、属性和样式。

#### 修改内容：

```javascript
let title = document.getElementById('title')
title.textContent = 'Hello, DOM!' // 修改文本内容
title.innerHTML = '<strong>Hello, DOM!</strong>' // 修改 HTML 内容
```

#### 修改属性：

```javascript
let image = document.getElementById('myImage')
image.src = 'new-image.jpg' // 修改 src 属性
image.setAttribute('alt', 'A new image') // 修改 alt 属性
```

#### 修改样式：

```javascript
let box = document.getElementById('box')
box.style.backgroundColor = 'blue' // 修改背景颜色
box.style.fontSize = '20px' // 修改字体大小
```

---

### 4. 添加和删除 DOM 元素

可以通过 JavaScript 动态添加或删除元素。

#### 添加元素：

```javascript
let newParagraph = document.createElement('p') // 创建新元素
newParagraph.textContent = 'This is a new paragraph.'
document.body.appendChild(newParagraph) // 添加到 body 中
```

#### 删除元素：

```javascript
let oldParagraph = document.getElementById('oldParagraph')
oldParagraph.remove() // 删除元素
```

---

## 事件处理

### 1. 什么是事件？

事件是用户与网页交互时触发的动作，比如点击按钮、移动鼠标、按下键盘等。JavaScript 可以通过事件监听器来响应这些事件。

---

### 2. 添加事件监听器

使用 `addEventListener` 方法可以为元素添加事件监听器。

#### 点击事件：

```javascript
let button = document.getElementById('myButton')
button.addEventListener('click', function () {
  alert('Button clicked!')
})
```

#### 鼠标移动事件：

```javascript
let box = document.getElementById('box')
box.addEventListener('mousemove', function (event) {
  console.log('Mouse position:', event.clientX, event.clientY)
})
```

#### 键盘事件：

```javascript
document.addEventListener('keydown', function (event) {
  console.log('Key pressed:', event.key)
})
```

---

### 3. 事件对象

事件处理函数会接收一个事件对象（`event`），包含事件的相关信息。

#### 常用属性：

- `event.target`：触发事件的元素。
- `event.type`：事件类型（如 "click"）。
- `event.clientX` / `event.clientY`：鼠标位置。

#### 示例：

```javascript
document.addEventListener('click', function (event) {
  console.log('Clicked element:', event.target)
  console.log('Click position:', event.clientX, event.clientY)
})
```

---

### 4. 事件冒泡与捕获

事件在 DOM 树中传播有两种方式：

- **事件冒泡**：从目标元素向上传播到根元素。
- **事件捕获**：从根元素向下传播到目标元素。

#### 阻止事件冒泡：

```javascript
button.addEventListener('click', function (event) {
  event.stopPropagation() // 阻止事件冒泡
})
```

#### 事件捕获模式：

```javascript
document.addEventListener(
  'click',
  function (event) {
    console.log('Captured:', event.target)
  },
  true
) // 第三个参数为 true，表示捕获模式
```

---

### 5. 常见事件类型

- **鼠标事件**：`click`、`dblclick`、`mouseover`、`mouseout`。
- **键盘事件**：`keydown`、`keyup`、`keypress`。
- **表单事件**：`submit`、`change`、`focus`、`blur`。
- **窗口事件**：`load`、`resize`、`scroll`。

---

## 实战小练习

### 1. DOM 操作练习

- 创建一个按钮，点击按钮时在页面中添加一个新的段落。
  ```javascript
  let button = document.getElementById('addButton')
  button.addEventListener('click', function () {
    let newParagraph = document.createElement('p')
    newParagraph.textContent = 'This is a new paragraph.'
    document.body.appendChild(newParagraph)
  })
  ```

### 2. 事件处理练习

- 创建一个输入框，当用户按下回车键时，显示输入的内容。
  ```javascript
  let input = document.getElementById('myInput')
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      alert('You entered: ' + input.value)
    }
  })
  ```

---

## 总结

DOM 操作和事件处理是 JavaScript 前端开发的核心技能。通过 DOM 操作，你可以动态修改网页内容；通过事件处理，你可以让网页与用户交互。掌握这些知识后，你可以尝试更复杂的项目，比如表单验证、动态内容加载等。

---

希望这些内容对你有帮助！如果需要进一步调整或补充，请随时告诉我！
