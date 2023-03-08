import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
    test('Initialized well', () => {
        const wrapper = shallowMount(Footer)
        expect(wrapper.isVueInstance()).toBe(true)
    })

    test('Footer contains "© 2023 by Hasbullog."', () => {
        const wrapper = shallowMount(Footer)
        expect(wrapper.html()).toContain('© 2023 by Hasbullog.')
    })
})