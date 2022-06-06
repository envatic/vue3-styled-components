import { h, } from 'vue'
import { mount } from '@vue/test-utils'
import { resetStyled, expectCSSMatches } from './utils'
import ThemeProvider from "../providers/ThemeProvider"


let styled

describe('props', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should execute interpolations and fall back', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `
    const vm = mount(Comp)
    expectCSSMatches('.a{color:black;}')
  })

  it('should add any injected theme to the component', () => {
    const theme = {
      blue: "blue",
    }

    const Comp = styled.div`
      color: ${props => props.theme.blue};
    `
    const Themed = {
      render: function() {
        return h(
          ThemeProvider,
          {
            theme,
          },
          [
            h(Comp)
          ]
        )
      }
    }

    const vm = mount(Themed)
    expectCSSMatches('.a{color:blue;}')
  })
})
