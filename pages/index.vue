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

const disabled = ref(false)

setInterval(async () => {
  const data = await $api.get('/posts')
  if (data.data.length > post.posts.length) {
    disabled.value = false
  }
}, 30000, this)

async function load () {
  await post.fetchPosts();
  disabled.value = true;
}

</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="grid gap-16">
    <button  
        class="font-medium text-md px-2 rounded-full"
        :class="{
          'bg-blue-200': !disabled,
          'bg-gray-200': disabled
        }"
        :disabled="disabled"
        @click="load">
        Load New Posts
      </button>
    <PostItem
      v-for="post in post.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
