<template>
  <div>
    <Header></Header>
    <div class="relative">
      <img src="~/assets/bg.jpg" class="home-background">
      <slot></slot>
    </div>
    <Footer></Footer>
    <UNotifications/>
  </div>
</template>
<script setup lang="ts">
import {useChallengeStore} from "~/stores/challenge.store";

const {topChallenge} = useChallengeStore()
</script>
<style>
.home-background {
  width: 100%;
  height: 100%;
  max-height: 650px;
  position: absolute;
  overflow: hidden;
  background-image: url("~/assets/bg.jpg");
  background-size: cover;
  background-color: rgb(255, 255, 255);
  background-position: center center;
  opacity: 0.3;
  filter: blur(8px);
  -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
}
</style>