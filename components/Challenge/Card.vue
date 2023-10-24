<template>
  <UCard class="rounded-3xl bg-[#f5f5f5] challenge-card cursor-pointer text-[#4B4B4B]" style="box-shadow: none;">
    <div class="image-container rounded-xl">
      <img :src="challenge.image" class="rounded-xl" />
    </div>
    <h1 class="font-bold mt-4 text-xl hover:text-sky-900">{{ challenge.title }}</h1>
    <div class="flex items-center justify-between">
      <h3 class="mt-1 text-md flex items-center gap-2">{{ $t("join") }}
        <UIcon name="i-heroicons-arrow-right-20-solid" />
      </h3>
      <h3 class="mt-1 text-md flex items-center gap-2" @click="handleShareChallenge">{{ $t("share") }}
        <UIcon name="i-heroicons-share-20-solid" />
      </h3>
    </div>
  </UCard>
</template>
<script setup>
const props = defineProps({
  challenge: {
    type: Object,
    default: () => ({})
  }
})

const handleShareChallenge = () => {
  const copyText = props.challenge.id
  navigator.clipboard.writeText(copyText);
}
</script>
<style>
.challenge-card {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  .image-container {
    height: auto;
    overflow: hidden;
    position: relative;

    img {
      transition: transform 0.3s ease-in-out;
    }
  }


}

.challenge-card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  transform: translate(0, -5px);
  background-color: bisque;

  .image-container {
    img {
      transform: scale(1.07);
    }
  }

}
</style>