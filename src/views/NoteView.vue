<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import codeEditor from "@/components/common/CodeEditor.vue";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { Memo } from "@element-plus/icons-vue";
import {
  exists,
  create,
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { join, desktopDir } from '@tauri-apps/api/path';
const marked = new Marked(
  markedHighlight({
    async: true,
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const route = useRoute();
const router = useRouter();
const viewMarkdown = ref(false);
const filePath = ref("");
const codeRef = ref(null);
const mdContent = ref("");
const content = ref("");
const tmpContent = ref("");
const autoSave = ref(false);
const isSaved = ref(true);
const autoSaveTime = ref(500);
const autoSaveInterval = ref(0);
const init = () => {
  codeRef.value.lang = "markdown";
  codeRef.value.setValue(``);
};
const changeVal = async (value) => {
  tmpContent.value = value;
  console.log(value, tmpContent.value, content.value);
  mdContent.value = await marked.parse(value);
  if (autoSave.value) {
    clearTimeout(autoSaveInterval.value);
    autoSaveInterval.value = setTimeout(() => {
      writeLocalFile();
    }, autoSaveTime.value);
  } else {
    if (content.value !== tmpContent.value) {
      isSaved.value = false;
    } else {
      isSaved.value = true;
    }
  }

};
// 写入本地文件
const writeLocalFile = async () => {
  let isExists = await exists("test.md", { baseDir: BaseDirectory.Desktop });
  if (!isExists) {
    const file = await create("test.md", {
      baseDir: BaseDirectory.Desktop,
    });
    await file.write(new TextEncoder().encode(""));
    await file.close();
  }
  await writeTextFile("test.md", tmpContent.value, {
    baseDir: BaseDirectory.Desktop,
  });
  isSaved.value = true;
};

// 读取本地文件
const readLocalFile = async () => {
  // 完整路径
  isSaved.value = true;
  filePath.value = await join(await desktopDir(), "test.md");
  let isExists = await exists("test.md", { baseDir: BaseDirectory.Desktop });
  if (!isExists) {
    const file = await create("test.md", {
      baseDir: BaseDirectory.Desktop,
    });
    await file.write(new TextEncoder().encode(""));
    await file.close();
  }
  const contents = await readTextFile("test.md", {
    baseDir: BaseDirectory.Desktop,
  });
  init();
  codeRef.value.setValue(contents);
  content.value = contents;
  tmpContent.value = contents;
};

onMounted(() => {
  // 
  readLocalFile();
  window.addEventListener("keydown", (e) => {
    // macos Command + s,window ctrl + s
    if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      console.log("保存");
      writeLocalFile();
    }
  });
});
</script>

<template>
  <div class="header">
    <el-icon :style="`color:${viewMarkdown ? '#ccc' : '#409eff'}`">
      <Memo @click="viewMarkdown = !viewMarkdown" />
    </el-icon>
    <div>
      {{ filePath }}
      <span v-show="!isSaved"
        style="width: 10px;height: 10px;display: inline-block;background-color: green;border-radius: 50%;"></span>
    </div>
  </div>
  <div class="container">
    <codeEditor ref="codeRef" @change="changeVal" class="editor" :style="`width:${viewMarkdown ? '50%' : '100%'}`">
    </codeEditor>
    <div v-show="viewMarkdown" class="markdown" v-html="mdContent"></div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 40px;
  line-height: 40px;
  border-bottom: solid 1px #ccc;
  padding: 0px 10px;
  display: flex;

  i {
    font-size: 26px;
    display: inline-block;
    margin-top: 7px;
    cursor: pointer;
  }

  div {
    padding: 0px 10px;
    font-family: consolas;
  }
}

.container {
  width: 100vw;
  height: calc(100vh - 40px);
  display: flex;
  background-color: #fff;
  overflow: hidden;

  .editor {
    width: 50%;
    height: 100%;
  }

  .markdown {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
<style lang="less">
.markdown {
  width: 500px;
  height: 500px;
  border: solid 1px #ccc;
  padding: 10px;

  .hljs {
    border: solid 1px #e5e5e5;
    border-radius: 7px;
    background-color: #f8f8f8;
    font-family: Consolas, "Courier New", monospace;

    * {
      font-family: Consolas, "Courier New", monospace;
    }
  }

  table {
    border-collapse: collapse;

    th {
      border-bottom: solid 1px #888;
      padding: 0px 15px;
      line-height: 30px;
    }

    td {
      border-top: solid 1px #ccc;
      padding: 0px 15px;
      line-height: 30px;
    }
  }
}
</style>
