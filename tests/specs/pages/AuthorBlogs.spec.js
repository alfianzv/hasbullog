import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import AuthorBlogs from '@/pages/AuthorBlogs.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

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
        filterPostsByAuthorId: () => () => [{ id: 2, title: 'Test Title', body: 'Test Body', userId: 1 }],
        filterAuthorsByUserId: () => () => state.authors[0],
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
        const wrapper = shallowMount(AuthorBlogs, {
            store,
            localVue,
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
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
        const wrapper = shallowMount(AuthorBlogs, {
            store,
            localVue,
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        const spy = jest.spyOn(wrapper.vm, 'searchPosts')
        const input = wrapper.find('input')
        input.setValue('Test Title')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
    })

    test('blog component is rendered with correct props', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            store,
            localVue,
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        const blog = wrapper.findComponent({ name: 'Blog' })
        expect(blog.exists()).toBe(true)
        expect(blog.props().id).toBe(2)
        expect(blog.props().title).toBe('Test Title')
        expect(blog.props().body).toBe('Test Body')
        expect(blog.props().userId).toBe(1)
    })

    test('computed: posts', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            localVue,
            store,
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        expect(wrapper.vm.posts).toEqual([{ id: 2, title: 'Test Title', body: 'Test Body', userId: 1 }])
    })

    test('computed: posts', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            localVue,
            store,
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        expect(wrapper.vm.posts).toEqual([{ id: 2, title: 'Test Title', body: 'Test Body', userId: 1 }])
    })

    test('computed: posts is empty', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            localVue,
            store,
            computed: {
                posts: () => []
            },
            stubs: ['router-link', 'router-view'],
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        expect(wrapper.vm.posts).toEqual([])
        expect(wrapper.find('h4').text()).toBe('No posts found')
    })

    test('computed: author', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            localVue,
            store,
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        console.log(wrapper.vm.author)
        expect(wrapper.vm.author).toEqual({ id: 1, name: 'Leanne Graham' })
    })

    test('computed: author is empty', () => {
        const { store } = getStore()
        const wrapper = shallowMount(AuthorBlogs, {
            localVue,
            store,
            computed: {
                author: () => null
            },
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        })
        expect(wrapper.vm.author).toBe(null)
        expect(wrapper.find('h1').exists()).toBe(false)
    })
})