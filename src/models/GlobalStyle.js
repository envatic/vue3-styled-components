
import flatten from '../utils/flatten'
import styleSheet from './StyleSheet'
//import stylis from 'stylis'
import { serialize, compile, middleware, namespace, stringify } from 'stylis'

export default class ComponentStyle {

    constructor(rules, selector) {
        this.rules = rules
        this.selector = selector
    }

    /*generateAndInject () {
      if (!styleSheet.injected) styleSheet.inject()
      const flatCSS = flatten(this.rules).join('')
      const cssString = this.selector ? `${this.selector} { ${flatCSS} }` : flatCSS
      const css = stylis('', cssString, false, false)
      styleSheet.insert(css, { global: true })
  
        serialize(compile(`${selector}{${styles}}`), middleware([namespace, stringify]))
    }*/

    generateAndInject() { 
        if (!styleSheet.injected) styleSheet.inject()
        const flatCSS = flatten(this.rules).join('')
        const cssString = this.selector ? `${this.selector} { ${flatCSS} }` : flatCSS
        const css = serialize(compile(cssString), middleware([namespace, stringify]))
        styleSheet.insert(css, { global: true })
    }
}
