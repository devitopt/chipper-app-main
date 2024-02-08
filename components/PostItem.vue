<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'

const favorite = useFavorite()

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

async function follow () {
  if( favorite.favorites.users.findIndex(el => el.id == props.post.user.id) !== -1 )
    await favorite.unFavoriteUser(props.post.user.id)
  else
    await favorite.favoriteUser(props.post.user.id)
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button  
        class="font-medium bg-blue-200 text-sm px-2 rounded-full"
        @click="follow">
        {{favorite.favorites.users.findIndex(el => el.id == props.post.user.id) !== -1 ? 'Unfollow' : 'Follow'}}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg">
      <HeartIcon
        class="h-6 stroke-current" />
      <span class="font-bold">
        Add to my favorites
      </span>
    </button>
  </div>
</template>