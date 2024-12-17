<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
// 跳转路径 /about
router.push("/request");
router.push("/note");
</script>

<template>
  <div class="container">
    <!-- <div>{{ route.fullPath }}</div> -->
    <RouterView />
  </div>
</template>

<style>
* {
  font-family: Inter, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
  /* // 浏览器滚动弹性禁止 */
  overflow: hidden;
}
</style>
