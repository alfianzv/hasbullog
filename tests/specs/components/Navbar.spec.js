import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
    routes: [
        { name: 'blogs', path: '/' },
        { name: 'authorBlogs', path: '/author/:id' }
    ]
})
localVue.use(Vuex)

function getStore() {
    const state = {
        authors: [
            {
                "id": 1,
                "name": "Leanne Graham",
            },
            {
                "id": 2,
                "name": "Ervin Howell",
            }
        ],
    }   
    const mutations = {
    }
    const actions = {
        getAuthors : jest.fn()
    }

    const getters = {
        authors: (state) => state.authors,
    }

    const options = {
        state,
        mutations,
        actions,
        getters
    }
    const store = new Vuex.Store(options)
    
    return {
        store,
        ...options
    }
}
describe('Navbar.vue', () => {
    test('Initialized well', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Navbar, {
            localVue,
            store,
            router
        })
        expect(wrapper.isVueInstance()).toBe(true)
    })

    test('fetch author on mount', () => {
        const { store, actions } = getStore()
        const wrapper = shallowMount(Navbar, {
            localVue,
            store,
            router
        })
        expect(actions.getAuthors).toHaveBeenCalled()
    })

    test('redirects to author blogs', () => {
        const { store } = getStore()
        const wrapper = mount(Navbar, {
            localVue,
            store,
            router
        })
        const link = wrapper.find('.dropdown a')
        link.trigger('click')
        expect(wrapper.vm.$route.path).toBe('/author/1')
    })
})