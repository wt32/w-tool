<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

import { copy } from "@/utils";
import HeaderParam from "./Header.vue";
import QueryParam from "./Query.vue";
import BodyParam from "./Body.vue";

const url = ref("http://localhost:1420/data.json");
const method = ref("GET");
const methods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"];
const responseType = ref("json");
const param = reactive({
  headers: [
    {
      key: "content-type",
      value: "application/json",
    },
    {
      key: "",
      value: "",
    },
  ],
  params: [],
  body: [],
});

const activeName = ref("header");
function handleClick() { }

const type = ref("1");

onMounted(() => { });
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Header" name="header" style="height: 100%;">
      <HeaderParam v-model="param.headers"></HeaderParam>
    </el-tab-pane>
    <el-tab-pane label="Query" name="query" style="height: 100%;">
      <QueryParam v-model="param.params"></QueryParam>
    </el-tab-pane>
    <el-tab-pane label="Body" name="body" style="height: 100%;">
      <div>
        <el-radio-group v-model="type">
          <el-radio value="1" size="large">FormData</el-radio>
          <el-radio value="2" size="large">Raw</el-radio>
        </el-radio-group>
        <el-dropdown trigger="click" @command="(type) => {
          responseType = type;
        }
          ">
          <span class="el-dropdown-link">
            {{ responseType }}
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="json">json</el-dropdown-item>
              <el-dropdown-item command="text">text</el-dropdown-item>
              <el-dropdown-item command="xml">xml</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <BodyParam v-model="param.body"></BodyParam>
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less" scoped>
.el-dropdown-link {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  padding: 0px 30px;
  cursor: pointer;
}
</style>