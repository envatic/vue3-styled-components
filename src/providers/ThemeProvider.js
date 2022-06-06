import { h, provide } from 'vue'

export default {
  props: {
    theme: Object
  },
  setup (props) {
    provide('theme', props.theme)
  },

  render () {
    return h('div', {}, this.$slots.default())
  }
}

