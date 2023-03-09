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

    test('Set selected author', () => {
        const { store } = getStore()
        const wrapper = mount(Navbar, {
            localVue,
            store,
            router
        })
        const dropDown = wrapper.find('#authorsList').findAll('option')
        dropDown.at(2).setSelected()
        expect(wrapper.find('option:checked').element.innerHTML).toBe(store.state.authors[1].name)
    })
    
    test('test after click on any author, it should redirect to authorBlogs page', async () => {
        const { store } = getStore()
        const pushRoute = jest.fn();
        const wrapper = mount(Navbar, {
            localVue,
            store,
            router
        })
        await wrapper.vm.$nextTick();
        const options = wrapper.find('#authorsList').findAll('option');
        await options.at(2).setSelected();
        console.log(wrapper.vm.$route.name);
        expect(pushRoute).toHaveBeenCalledWith({
            name: 'authorBlogs',
            params: { id: store.state.authors[1].id },
        });
    })
})