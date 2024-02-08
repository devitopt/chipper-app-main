import { find, uniq, get } from 'lodash-es'

export const useFavorite = defineStore('favorite', () => {
    const { $api } = useNuxtApp()

    const favorites = ref({})

    async function fetchFavorites () {
        const data = await $api.get('/favorites')
        favorites.value = data.data
        console.log(data.data);
    }

    async function favoriteUser (userId) {
        try {
            await $api.post(`/users/${userId}/favorite`, userId)
            await fetchFavorites();
        } catch ( err ) {
            alert("Sth went wrong, you might have followed yourself!")
        }   
    }

    async function unFavoriteUser (userId) {
        try {
            await $api.delete(`/users/${userId}/favorite`, userId)
            await fetchFavorites();
        } catch ( err ) {
            alert("Sth went wrong")
        }   
    }

    return {
        favorites,
        fetchFavorites,
        favoriteUser,
        unFavoriteUser
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFavorite, import.meta.hot))
}
