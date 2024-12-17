<script setup>
import { ref, onMounted } from 'vue'
import { exists, BaseDirectory } from '@tauri-apps/plugin-fs';
import { Command } from '@tauri-apps/plugin-shell';
import { writeText, readText, readImage, writeImage } from '@tauri-apps/plugin-clipboard-manager';


// 检查 `$APPDATA/avatar.png` 文件是否存在
let hasFile = ref(true);
async function check() {
  hasFile.value = await exists('avatar.png', { baseDir: BaseDirectory.AppData });

  let result = await Command.create('exec-sh', [
    "dir C:\Users\wt32\Downloads\video-rm",
  ]).execute();
  console.log(result);
}

// 写入剪切板
async function write() {
  await writeText('Hello, world!');
  // const buffer = [
  //   // A red pixel
  //   255, 0, 0, 255,

  //   // A green pixel
  //   0, 255, 0, 255,
  // ];
  // await writeImage(buffer);
}
const text = ref('');
// 读取剪切板
async function read() {
  text.value = await readText();
  console.log(text);
  // const clipboardImage = await readImage();
  // const blob = new Blob([clipboardImage.bytes], { type: 'image' })
  // url.value = URL.createObjectURL(blob)
}

onMounted(() => {

})

</script>

<template>
  <div class="about">
    <h1 @click="check">This is an about page</h1>
    {{ hasFile }}
    <div @click="write">
      剪切板 write
    </div>
    <div @click="read">
      剪切板 read
    </div>
    {{ text }}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
