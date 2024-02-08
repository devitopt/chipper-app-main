import { find, uniq, get } from 'lodash-es'

export const usePost = defineStore('post', () => {
    const { $api } = useNuxtApp()

    const posts = ref([])

    async function fetchPosts () {
        const data = await $api.get('/posts')
        posts.value = data.data
    }

    async function storePost (data) {
        const result = await $api.post('/posts', data)
        posts.value = [result.data, ...posts.value]
    }

    return {
        posts,
        fetchPosts,
        storePost
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePost, import.meta.hot))
}
