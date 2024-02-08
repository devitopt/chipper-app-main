<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const { $api } = useNuxtApp()
const user = useUser()
const post = usePost()
const favorite = useFavorite()

await post.fetchPosts()
await favorite.fetchFavorites()
</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem
      v-for="post in post.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
