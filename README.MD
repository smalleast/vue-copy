
# vue-copy
```
vue实现剪贴板的复制粘贴
```
##安装依赖

npm install --save smalleast/vue-copy
##用法：

#对于vue-cli用户：

import Vue
import VueCopy from 'vue-copy'

Vue.use(VueCopy)

对于独立使用：

<script src="vue.min.js"></script>
<!-- 必须在vue.js之后放置这一行 -->
<script src="dist/vue-copy.min.js"></script>


Demo：

<template id="demo">
  <div class="container">
    <input type="text" v-model="message">
    <button type="button"
     v-clipboard:copy="message"
     v-clipboard:success="onCopy"
     v-clipboard:error="onError">复制</button>
  </div>
</template>
<script>
new Vue({
  el: '#app',
  template: '#demo',
  data: function () {
    return {
      message: '这是复制的内容！'
    }
  },
  methods: {
    onCopy: function (e) {
      console.log('你刚刚复制: ' + e.text)
    },
    onError: function (e) {
      console.log('无法复制文本！')
    }
  }
})
</script>

## 说明
```
>  如有问题或者遇到坑请直接在 Issues 中提，或者可以加我的QQ 382026180

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

```

## 项目布局
```
|-- build								                        // gulp的配置目录
|   |-- build.js							           // gulp的打包build的配置文件 npm run build
|   |-- clean.js							            // gulp清除的配置文件
|   |-- config.js							          // gulp配置文件
|   |-- script.js							          // gulp任务配置文件
|-- src									                       // 静态源码目录
|   |-- vue-copy.js								                // js源码
|-- .babelrc							                        // ES6语法编译配置
|-- .editorconfig						                      // 代码编写规格
|-- .gitignore							                      // git忽略的文件
|-- .npmrc							                          // npm配置管理及设置代理
|-- package.json						                      // 项目及工具的依赖配置文件
|-- package-lock.json					                    // 快捷下载依赖的配置文件
|-- README.md							                        // 说明
```


##soucre
```

[clipboard.js](https://github.com/zenorocha/clipboard.js)
```
