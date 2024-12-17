<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { load,LazyStore } from '@tauri-apps/plugin-store'
const store = new LazyStore('store.json');
const key = ref('key-1')
const data = ref('')
const content = ref('')

console.log(store)

async function setData() {
    await store.set(key.value, { value: data.value,data1: data.value ,data2: data.value  });
    await store.save();
}

async function getData() {
    content.value = await store.get(key.value);
}

onMounted(async () => {
    // store = await load('store.json', { autoSave: false });
})
</script>
<template>
    <div>
        <el-input v-model="key" style="width: 100px" placeholder="Please input" />
        <el-input v-model="data" style="width: 120px" placeholder="Please input" />
        <el-button type="primary" @click="setData">请求</el-button>
    </div>
    <div>
        <el-button type="primary" @click="getData">获取</el-button>
        <div>
            {{ content }}
        </div>
    </div>
</template>
<style scoped>
/** less format css code here */
</style>