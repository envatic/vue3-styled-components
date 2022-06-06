import { mount } from '@vue/test-utils'

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('extending styled', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should append extended styled to the original class', () => {
    const Base = styled.div`
      color: blue;
    `
    const Extended = Base.extend`
      background: green;
    `

    const b = mount(Base)
    const e = mount(Extended)

    expectCSSMatches('.a {color: blue;} .b {color: blue;background: green;}')
  })
})
