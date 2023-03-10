import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BlogDetail from '@/pages/BlogDetail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

function getStore() {
    const state = {
        post: {
            id: 1,
            title: 'Test Post',
            body: 'This is a test post'
        },
        author: {
            id: 1,
            name: 'John Doe'
        }
    };
    const mutations = {
        clearPost(state) {
            state.post = null;
        },
        clearAuthor(state) {
            state.author = null;
        }
    };
    const actions = {
        getPost: jest.fn(),
        getAuthor: jest.fn()
    };

    const getters = {
        post: state => state.post,
        author: state => state.author
    };

    const options = {
        state,
        mutations,
        actions,
        getters
    };

    const store = new Vuex.Store(options);

    return {
        store,
        ...options
    };
}

describe('BlogDetail.vue', () => {
    test('Initialized well', () => {
        const { store } = getStore()
        const wrapper = shallowMount(BlogDetail, {
            store,
            localVue,
            router,
        })
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.find('h1').text()).toBe('Test Post')
        expect(wrapper.find('p').text()).toBe('Written by: John Doe')
        expect(wrapper.find('div > p').text()).toBe('This is a test post')
    })

    test('method: getPost is called once', async () => {
        const getPost = jest.spyOn(BlogDetail.methods, 'getPost')
        const { store } = getStore()
        const wrapper = shallowMount(BlogDetail, {
            store,
            localVue,
            router,
        })
        await wrapper.vm.$nextTick()

        expect(getPost).toHaveBeenCalledTimes(1)
    })
    
    test('method: getAuthor is called once', async () => {
        const getAuthor = jest.spyOn(BlogDetail.methods, 'getAuthor')
        const { store } = getStore()
        const wrapper = shallowMount(BlogDetail, {
            store,
            localVue,
            router,
        })
        await wrapper.vm.$options.watch.post.call(wrapper.vm)
        expect(getAuthor).toHaveBeenCalledTimes(1)
    })
})