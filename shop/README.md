# shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


1#登录业务的相关技术点
    http是无状态的，两种方式保存状态：
    ①、通过cookie在客客户端记录或者通过session在服务端记录
    ②、通过token方式维持状态
    区别：跨域的问题就选择token，不存在跨域问题选择cookie或者session

Vue.protptype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

退出功能是要清空token并且重新到登录
     window.sessionStorage.clear()
      this.$router.push('/login')

通过axios请求拦截器添加token，保证拥有获取数据的权限（为请求头对象挂载一个自定义属性）
