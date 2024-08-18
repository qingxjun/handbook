// 导入axios模块
const axios = require('axios')

// 定义要请求的API URL
const url = 'http://localhost:3000/scrm/academy/wecom/user/login'

// 发送GET请求
axios
  .post(url, {
    userName: 'admin',
    passWord: '123456',
  })
  .then((response) => {
    // 成功获取数据后的处理
    console.log('Response:', response.data)
  })
  .catch((error) => {
    // 处理错误情况
    console.error('Error fetching data:', error.message)
  })
