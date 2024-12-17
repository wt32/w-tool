<script setup>
import { ref, onMounted, reactive } from "vue";
import { fetch } from "@tauri-apps/plugin-http";
import { useRoute } from "vue-router";
import Store from "@/components/Store.vue";
import CodeEditor from "@/components/common/CodeEditor.vue";
import Parameter from "@/components/Request/Parameter.vue";
import { Plus, Search } from "@element-plus/icons-vue";
import { useParameterStore } from "@/stores/parameter";
let store = useParameterStore();
const codeEditor = ref(null);
const route = useRoute();

const url = ref("http://localhost:1420/data.json");
const method = ref("GET");
const methods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"];
const data = ref("");
const contentType = ref("");
const loading = ref(false);
const responseTime = ref(0);
const search = ref("");
const hasMounted = ref(false);

const param = reactive({
  headers: [
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "",
      value: "",
    },
  ],
  params: [4, 5, 6],
  body: { a: 1, b: 2 },
});

async function send() {
  URL.revokeObjectURL(data.value);
  localStorage.setItem("url", url.value);
  loading.value = true;
  let response = {};
  try {
    let time = new Date();
    responseTime.value = 0;
    response = await fetch(url.value, {
      method: method.value,
    });
    responseTime.value = new Date() - time;
    loading.value = false;
  } catch (error) {
    console.log("error", error);
    loading.value = false;
  }
  contentType.value = response.headers.get("content-type");
  if (response.ok) {
    // 请求成功
    if (contentType.value === "application/json") {
      // 返回JSON对象
      data.value = await response.json();
    } else {
      data.value = await response.text();
    }
    // codeEditor.value.lang = contentType.value[1];
    codeEditor.value.lang = "json";
    console.log(55, data.value);
    if (typeof data.value === "object") {
      data.value = JSON.stringify(data.value, null, 2);
      codeEditor.value.setValue(data.value);
    } else {
      codeEditor.value.setValue(
        JSON.stringify(JSON.parse(data.value), null, 2)
      );
    }
  }
}

onMounted(() => {
  if (localStorage.getItem("url")) {
    url.value = localStorage.getItem("url");
  }
  store.setValue("headers", param.headers);
  store.setValue("params", param.params);
  store.setValue("body", param.body);
  hasMounted.value = true;
  document.title = "请求";
});
</script>

<template>
  <div class="container">
    <div class="history">
      <div style="display: flex; margin-bottom: 10px">
        <el-input v-model="search" style="width: 240px" placeholder="Please Input" :suffix-icon="Search" />
        <el-button type="primary">
          新增 <el-icon>
            <Plus />
          </el-icon>
        </el-button>
      </div>
      <div class="list">
        <div>12312321</div>
      </div>
    </div>
    <div class="request">
      <div style="height: 50%">
        <el-space wrap style="margin-bottom: 8px">
          <el-select v-model="method" placeholder="Select" size="" style="width: 100px">
            <el-option v-for="item in methods" :key="item" :label="item" :value="item" />
          </el-select>
          <el-input v-model="url" style="width: 240px" placeholder="Please input" />
          <el-button type="primary" :loading="loading" @click="send">请求({{ responseTime }}ms)</el-button>
        </el-space>
        <div style="height: calc(100% - 50px);">
          <Parameter style="height:100%;" v-if="hasMounted" ref="parameter"></Parameter>
        </div>
      </div>
      <div style="height: 50%">
        <CodeEditor style="height: 100%" ref="codeEditor"></CodeEditor>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  height: calc(100vh - 20px);
  padding: 10px;
  display: flex;

  .history {
    width: 20%;
    border: solid 1px #ccc;
    border-right: 0px;
    box-sizing: border-box;
    padding: 10px;
  }

  .request {
    width: 80%;
    border: solid 1px #ccc;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>