import { h } from 'vue'
import { mount } from '@vue/test-utils'
import expect from 'expect'
import { resetStyled, expectCSSMatches } from './utils'
let styled

describe('"as" polymorphic prop', () => {
    beforeEach(() => {
        styled = resetStyled()
    })

    it('should render "as" polymorphic prop element', () => {
        const Base = styled.div`
      color: blue;
    `
        const b = mount({
            provide: { theme: {} },
            render: () => h(Base, {
                as: 'button'
            })
        })

        expect(b.element.tagName.toLowerCase()).toEqual('button')
    })


    it('should append base class to new components composing lower level styled components', () => {
        const Base = styled.div`
      color: blue;
    `
      
        const Composed = styled(Base, {
            bg: String,
        })`
      background: ${props => props.bg};
    `
        const b = mount({
            provide: { theme: {}},
            render: () => h(Base)
        });
        const c = mount({
            provide: { theme: {} },
            render: () => h(Composed, {
                bg: 'yellow',
                as: 'dialog'
            })
        })
        expect(c.element.tagName.toLowerCase()).toEqual('dialog')
        expect(c.element.classList.contains(b.element.classList.toString())).toBeTruthy()
        expectCSSMatches(`.a{color:blue;}
.b{background:yellow;}`)
    })
})
