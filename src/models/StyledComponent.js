import { h } from 'vue'
import css from '../constructors/css'
import normalizeProps from '../utils/normalizeProps'
import isVueComponent from '../utils/isVueComponent'

export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
    const componentStyle = new ComponentStyle(rules)

    const isStringTarget = typeof target === 'string'
    // handle array-declaration props
    const currentProps = normalizeProps(props)
    const prevProps = normalizeProps(target.props)

    const passProps = ['as', 'value', ...Object.keys(prevProps)]

    const StyledComponent = {
      props: {
        as: [String, Object],
        value: null,
        modelValue: null,

        ...currentProps,
        ...prevProps
      },

      inject: {
        theme: {
          default: { }
        }
      },

      data () {
        return {
          localValue: this.modelValue || this.value
        }
      },

      computed: {
        passProps () {
          return passProps.reduce((props, propName) => {
            if (propName === 'as' && isStringTarget) {
              return props
            }
            if (this.$props[propName] !== undefined) {
              props[propName] = this.$props[propName]
            }
            return props
          }, {})
        },
        valueProps () {
          if (this.modelValue === undefined && this.value === undefined) {
            return {}
          }

          return {
            value: this.localValue,
            onInput: event => {
              if (event && event.target) {
                this.localValue = event.target.value
              }
            }
          }
        }
      },

      watch: {
        localValue (val) {
          if (this.modelValue !== undefined) {
            this.$emit('update:modelValue', val)
          } else {
            this.$emit('update:value', val)
          }
        }
      },

      render () {
        const styleClass = componentStyle.generateAndInjectStyles({ theme: this.theme, ...this.$props })

        return h(
          isVueComponent(target) ? target : this.$props.as || target,
          {
            ...this.passProps,
            ...this.valueProps,
            ...this.$attrs,
            class: [styleClass]
          },
          this.$slots
        )
      },

      extend (cssRules, ...interpolations) {
        const extendedRules = css(cssRules, ...interpolations)
        return createStyledComponent(target, rules.concat(extendedRules), props)
      },
      withComponent (newTarget) {
        return createStyledComponent(newTarget, rules, props)
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
