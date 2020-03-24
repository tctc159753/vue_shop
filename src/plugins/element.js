import Vue from 'vue'
// 导入 element-ui 组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// import { Form, FormItem } from 'element-ui'
// import { Input } from 'element-ui'// 多次导入会报错，放在同一个里面

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Input)
Vue.prototype.$message = Message// 这个弹窗组件需要全局挂载, $message 这个可以自定义的
