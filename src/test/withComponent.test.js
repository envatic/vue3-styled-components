import { mount } from '@vue/test-utils'
import { assert } from 'chai'

import { resetStyled } from './utils'

let styled

describe('extending styled', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should change the target element', () => {
    const OldTarget = styled.div`color: blue;`
    const NewTarget = OldTarget.withComponent('a')

    const o = mount(OldTarget)
    const n = mount(NewTarget)

    assert(o.element instanceof HTMLDivElement);
    assert(n.element instanceof HTMLAnchorElement);
  })
})
