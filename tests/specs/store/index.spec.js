import store from '@/store/main'
import axios from 'axios'

jest.mock('axios')
jest.mock('@/store/index.js')

const state = {
    posts: [
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "userId": 2,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
    ],
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
    author: {
        "id": 1,
        "name": "Leanne Graham",
    },
    post: {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    error: 'Request failed with status code 404',
}

describe('getters', () => {
    test('getters', () => {
        expect(store.getters.posts(state)).toEqual(state.posts)
        expect(store.getters.authors(state)).toEqual(state.authors)
        expect(store.getters.author(state)).toEqual(state.author)
        expect(store.getters.post(state)).toEqual(state.post)
        expect(store.getters.error(state)).toEqual(state.error)
        expect(store.getters.filterAuthorsByUserId(state)(1)).toEqual(state.authors[0])
        expect(store.getters.filterAuthorsByUserId(state)(20)).toEqual(null)
        expect(store.getters.filterPostsByAuthorId(state)(2)).toEqual([state.posts[1]])
        expect(store.getters.searchPosts()(state.posts, 'qui')).toEqual([state.posts[1]])
    })
})

describe('mutations', () => { 
    test('mutations updatePost', () => {
        const newPost = {
            "userId": 123,
            "id": 123,
            "title": "new title",
            "body": "new body"
        }
        store.mutations.updatePost(state, newPost)
        expect(state.post).toEqual(newPost)
    })

    test('mutations updatePosts', () => {
        const newPosts = [
            {
                "userId": 123,
                "id": 123,
                "title": "new title",
                "body": "new body"
            },
            {
                "userId": 1234,
                "id": 1234,
                "title": "new title 2",
                "body": "new body 2"
            },
        ]
        store.mutations.updatePosts(state, newPosts)
        expect(state.posts).toEqual(newPosts)
    })

    test('mutations updateAuthor', () => {
        const newAuthor = {
            "id": 123,
            "name": "new name",
        }
        store.mutations.updateAuthor(state, newAuthor)
        expect(state.author).toEqual(newAuthor)
    })

    test('mutations updateAuthors', () => {
        const newAuthors = [
            {
                "id": 123,
                "name": "new name",
            },
            {
                "id": 1234,
                "name": "new name 2",
            },
        ]
        store.mutations.updateAuthors(state, newAuthors)
        expect(state.authors).toEqual(newAuthors)
    })

    test('mutations updateError', () => {
        const newError = 'Request failed with status code 404'
        store.mutations.updateError(state, newError)
        expect(state.error).toEqual(newError)
    })

    // Dummy
    test('mutations dummyBody', () => {
        store.mutations.dummyBody(state, state.post.body)
        expect(state.post.body).toEqual(state.post.body)
    })

    test('mutation clearPost', () => {
        store.mutations.clearPost(state)
        expect(state.post).toEqual({})
    })

    test('mutation clearPosts', () => {
        store.mutations.clearPosts(state)
        expect(state.posts).toEqual([])
    })

    test('mutation clearAuthor', () => {
        store.mutations.clearAuthor(state)
        expect(state.author).toEqual({})
    })
})

describe('actions', () => { 
    test('actions getPosts', async () => {
        const commit = jest.fn()
        axios.get.mockResolvedValue({ data: state.posts })

        await store.actions.getPosts({ commit })
        expect(commit).toHaveBeenCalledWith('updatePosts', state.posts)
    })

    test('actions getPosts error', async () => {
        const commit = jest.fn()
        axios.get.mockRejectedValue(new Error(state.error))

        await store.actions.getPosts({ commit })
        await Promise.resolve()

        expect(commit).toHaveBeenCalledWith('updateError', state.error)
    })

    test('actions getAuthors', async () => {
        const commit = jest.fn()
        axios.get.mockResolvedValue({ data: state.authors })

        await store.actions.getAuthors({ commit })
        expect(commit).toHaveBeenCalledWith('updateAuthors', state.authors)
    })

    test('actions getAuthors error', async () => {
        const commit = jest.fn()
        axios.get.mockRejectedValue(new Error(state.error))

        await store.actions.getAuthors({ commit })
        await Promise.resolve()

        expect(commit).toHaveBeenCalledWith('updateError', state.error)
    })

    test('actions getPost', async () => {
        const commit = jest.fn()
        axios.get.mockResolvedValue({ data: state.post })

        await store.actions.getPost({ commit }, 1)
        expect(commit).toHaveBeenCalledWith('updatePost', state.post)
    })

    test('actions getPost error', async () => {
        const commit = jest.fn()
        axios.get.mockRejectedValue(new Error(state.error))

        await store.actions.getPost({ commit }, 1)
        await Promise.resolve()

        expect(commit).toHaveBeenCalledWith('updateError', state.error)
    })

    test('actions getAuthor', async () => {
        const commit = jest.fn()
        axios.get.mockResolvedValue({ data: state.author })

        await store.actions.getAuthor({ commit }, 1)
        expect(commit).toHaveBeenCalledWith('updateAuthor', state.author)
    })

    test('actions getAuthor error', async () => {
        const commit = jest.fn()
        axios.get.mockRejectedValue(new Error(state.error))

        await store.actions.getAuthor({ commit }, 1)
        await Promise.resolve()

        expect(commit).toHaveBeenCalledWith('updateError', state.error)
    })
})