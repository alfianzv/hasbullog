import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Blog from '@/components/Blog.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
    routes: [
        { name: 'blogDetail', path: '/blog/:id' },
        { name: 'authorBlogs', path: '/author/:id' }
    ]
})
localVue.use(Vuex)

const propsData = {
    title: 'Test Title',
    body: 'Test Body',
    id: 2,
    userId: 1,
}

function getStore() {
    const state = {
        authors: [
            {
                "id": 1,
                "name": "Leanne Graham",
            },
        ],
    }   
    const mutations = {
    }
    const actions = {
    }

    const getters = {
        filterAuthorsByUserId: (state) => (id) => {
            return state.authors.filter(author => author.id === id)
        }
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

describe('Blog.vue', () => {
// Still dont know how to check router
    test('Initialized well', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blog, {
            localVue,
            store,
            router,
            propsData,
        })
        expect(wrapper.isVueInstance()).toBe(true)
    })

    test('computed: currentAuthor', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blog, {
            localVue,
            store,
            router,
            propsData,
        })
        expect(wrapper.isVueInstance()).toBe(true)
        const vm = wrapper.vm
        expect(vm.currentAuthor[0].name).toBe(store.getters.filterAuthorsByUserId(propsData.userId)[0]?.name)
    })

    test('onclick navigate to blog detail page', () => {
        const { store } = getStore()
        const wrapper = mount(Blog, {
            localVue,
            store,
            router,
            propsData,
        })
        wrapper.find('a').trigger('click')
        expect(wrapper.vm.$route.path).toBe('/blog/2')
    })

    test('onclick navigate to author blog page', () => {
        const { store } = getStore()
        const wrapper = mount(Blog, {
            localVue,
            store,
            router,
            propsData,
        })
        wrapper.find('a.author').trigger('click')
        expect(wrapper.vm.$route.path).toBe('/author/1')
    })
})