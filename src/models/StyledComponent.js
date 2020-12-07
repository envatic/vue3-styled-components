import { h, inject } from 'vue'
import css from '../constructors/css'
import isVueComponent from '../utils/isVueComponent'
import normalizeProps from '../utils/normalizeProps'

export default (ComponentStyle) => {
  const createStyledComponent = (tagOrComponent, rules, propDefinitions) => {
    const componentStyle = new ComponentStyle(rules)
    const targetPropDefinitions = normalizeProps(tagOrComponent.props)
    const ownPropDefinitions = normalizeProps(propDefinitions)

    const targetPropDefinitionKeys = tagOrComponent.props ? Object.keys(
      targetPropDefinitions
    ) : []

    const combinedPropDefinition = tagOrComponent.props
      ? { ...ownPropDefinitions, ...targetPropDefinitions }
      : ownPropDefinitions

    return {
      props: {
        as: [String, Object],
        modelValue: null,
        ...combinedPropDefinition
      },

      setup (props, { slots, attrs, emit }) {
        const theme = inject('theme')

        return () => {
          const styleClass = componentStyle.generateAndInjectStyles({ theme, ...props, ...attrs })
          const classes = [styleClass]

          if (attrs.class) {
            classes.push(attrs.class)
          }

          const targetProps = {}

          if (targetPropDefinitionKeys.length) {
            for (const [key, value] of Object.entries(props)) {
              if (targetPropDefinitionKeys.includes(key)) {
                targetProps[key] = value
              }
            }
          }

          return h(
            isVueComponent(tagOrComponent) ? tagOrComponent : props.as || tagOrComponent,
            {
              value: props.modelValue,
              ...attrs,
              ...targetProps,
              class: classes,
              'data-is-new': true,
              onInput: (e) => {
                emit('update:modelValue', e.target.value)
                emit('input', e)
              }
            },
            slots
          )
        }
      },

      extend (cssRules, ...interpolations) {
        const extendedRules = css(cssRules, ...interpolations)
        return createStyledComponent(tagOrComponent, rules.concat(extendedRules), propDefinitions)
      },
      withComponent (newTarget) {
        return createStyledComponent(newTarget, rules, propDefinitions)
      }
    }
  }

  return createStyledComponent
}
