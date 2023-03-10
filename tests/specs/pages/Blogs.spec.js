import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Blogs from '@/pages/Blogs.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter(
    {
        routes: [
            {
                path: '/',
                name: 'blogs',
            },
            {
                path: '/:id',
                name: 'blogDetail',
            },
            {
                path: '/author/:id',
                name: 'authorBlogs',
            },
        ]
    }
)

const methods = {
    authorPost: jest.fn()
}

function getStore() {
    const state = {
        posts: [
            {
                "userId": 1,
                "id": 2,
                "title": "Test Title",
                "body": "Test Body"
            },
        ],
        authors: [
            {
                "id": 1,
                "name": "Leanne Graham",
            },
        ],
    };
    const mutations = {
        
    };
    const actions = {
        getPosts: jest.fn()
    };

    const getters = {
        posts: (state) => state.posts, 
        authors: (state) => state.authors,
        searchPosts: () => () => [{ id: 2, title: 'Test Title', body: 'Test Body', userId: 1 }],
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

describe('Blogs.vue', () => {
    test('Initialized well and components exist', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blogs, {
            store,
            localVue,
            router,
        })
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.find('img').attributes().src).toBe('../assets/hasbulla.png')
        expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'Wrapper' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'Blog' }).exists()).toBe(true)
    })

    test('run searchPosts when search bar is updated', async () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blogs, {
            store,
            localVue,
            router,
            methods
        })
        const spy = jest.spyOn(wrapper.vm, 'searchPosts')
        const input = wrapper.find('input')
        input.setValue('Test Title')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
    })

    test('blog component is rendered with correct props', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blogs, {
            store,
            localVue,
            router,
            methods
        })
        const blog = wrapper.findComponent({ name: 'Blog' })
        expect(blog.exists()).toBe(true)
        expect(blog.props().id).toBe(2)
        expect(blog.props().title).toBe('Test Title')
        expect(blog.props().body).toBe('Test Body')
        expect(blog.props().userId).toBe(1)
    })

    test('blogPost is empty', () => {
        const { store } = getStore()
        const wrapper = shallowMount(Blogs, {
            store,
            localVue,
            router,
            methods,
            computed: {
                blogPosts: () => []
            }
        })

        expect(wrapper.vm.blogPosts).toEqual([])
        expect(wrapper.find('h4').text()).toBe('No posts found')
    })
})