<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const close = () => {
  emit('update:modelValue', false)
}

</script>

<template>
  <div class="dialog" v-if="modelValue">
    {{ modelValue }}
    <button class="close" @click="close">关闭</button>
    <h3>我是Demo3子组件</h3>
  </div>
</template>
<style scoped>
.dialog {
  width: 500px;
  padding: 10px;
  border: 5px solid #ccc;
  position: relative;
  overflow: auto;
}

.close {
  position: absolute;
  right: 10px;
}
</style>