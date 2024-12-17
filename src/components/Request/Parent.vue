<template>
  <button @click="() => isShow = !isShow">开关Demo3</button>
  <div>isShow: {{ isShow }}</div>
  <Demo3 v-model="isShow"></Demo3>
</template>
<script setup>
import Demo3 from './Child.vue';
import { ref } from 'vue';
const isShow = ref(true)

</script>