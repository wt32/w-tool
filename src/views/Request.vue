<script setup>
import { ref, onMounted } from 'vue';
import { fetch } from '@tauri-apps/plugin-http';
import { useRoute } from 'vue-router';
const route = useRoute();

const url = ref('');
const method = ref('GET');
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];
const data = ref('');
const contentType = ref('');

async function send() {
  URL.revokeObjectURL(data.value)
  // Send a GET request
  localStorage.setItem("url", url.value)
  const response = await fetch(url.value, {
    method: method.value,
  });
  contentType.value = response.headers.get('content-type').split(';')[0].split("/");
  // response.text()：返回字符串
  // response.json()：返回JSON对象
  // response.formData()：返回FormData对象
  // response.blob()：返回blob对象
  // response.arrayBuffer()：返回二进制数组ArrayBuffer对象
  // 判断请求返回类型
  if (response.ok) {
    // 请求成功
    if (contentType.value.join("/") === 'application/json') {
      // 返回JSON对象
      data.value = await response.json();
    } else if (contentType.value[0] === 'text') {
      // 返回字符串
      data.value = await response.text();
    } else if (contentType.value[0] === 'image') {
      // 返回blob对象
      let blob = await response.blob();
      data.value = URL.createObjectURL(blob);
    } else if (contentType.value.join("/") === 'application/octet-stream') {
      // 返回二进制数组ArrayBuffer对象
      data.value = await response.arrayBuffer();
    } else {
      // 其他类型
      data.value = await response.text();
    }
  }
}
onMounted(() => {
  if (localStorage.getItem("url")) {
    url.value = localStorage.getItem("url")
  }
})
</script>

<template>
  <div>
    <div>
      <el-select v-model="method" placeholder="Select" size="" style="width: 100px">
        <el-option v-for="item in methods" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="url" style="width: 240px" placeholder="Please input" />
      <el-button type="primary" @click="send">请求</el-button>{{ contentType }}
    </div>
    <div v-if="contentType[0] == 'text'">
      <el-scrollbar height="calc(100vh - 100px)">
        <highlightjs style="width:100vw" :language="contentType[1]" :code="data" />
      </el-scrollbar>
    </div>
    <div v-if="contentType[0] == 'image'">
      <img :src="data" style="width:calc(100vw - 20px)" alt="" srcset="">
    </div>
    <div v-if="contentType[0] == 'video'">
      <source :src="data" :type="contentType.join('/')" />
    </div>


  </div>
</template>
