
import expect from 'expect'

import styleSheet from '../models/StyleSheet'
import { resetStyled, expectCSSMatches } from './utils'
import { mount } from '@vue/test-utils';


let styled

describe('basic', () => {
    /**
     * Make sure the setup is the same for every test
     */
    beforeEach(() => {
        styled = resetStyled()
    })

    it('should not throw an error when called', () => {
        styled.div``
    })

    it('should inject a stylesheet when a component is created', () => {
        const Comp = styled.div``
        const vm = mount(Comp)
        expect(styleSheet.injected).toBe(true)
    })


    it('should not generate any styles by default', () => {
        styled.div``
        expectCSSMatches('')
    })

    it('should throw an error when called', () => {
        expect(() => styled``).toThrow()
        expect(() => styled.notExistTag``).toThrow()
    })

    it('should allow for inheriting components that are not styled', () => {
        const componentConfig = { name: 'Parent', template: '<div><slot/></div>', methods: {} }
        expect(() => styled(componentConfig, {})``).not.toThrow()
    })

})
