import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const context = require.context('./components', false, /\.vue$/)

export default ({
  Vue
}) => {
  Vue.use(ElementUI)
  context.keys().forEach(key => {
    let component = context(key).default
    Vue.component(component.name, component)
  })
}
