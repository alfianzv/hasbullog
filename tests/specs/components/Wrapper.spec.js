import { mount, shallowMount } from '@vue/test-utils'
import Wrapper from '@/components/Wrapper.vue'

describe('Wrapper.vue', () => {
    test('Initialized well', () => {
        const wrapper = shallowMount(Wrapper)
        expect(wrapper.isVueInstance()).toBe(true)
    })
    test('Wrapper slots content is rendered', () => {
        const wrapper = mount(Wrapper, {
            slots: {
                default: [
                    '<img src="../assets/hasbulla.png" alt="">',
                ]
            }
        })
        expect(wrapper.html()).toContain('<img src="../assets/hasbulla.png" alt="">')
    })
})