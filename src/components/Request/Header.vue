<script setup>
import { ref, onMounted, reactive, defineProps } from "vue";
import { fetch } from "@tauri-apps/plugin-http";
import { useRoute } from "vue-router";
import { useParameterStore } from "@/stores/parameter";
const store = useParameterStore();
console.log(store.getValue("headers"));
const tableData = reactive([...store.getValue("headers")]);
const keys = ["Content-Type", "Accept", "Authorization", "Cookie"].map(
  (item) => ({ value: item })
);
const values = ["application/json", "Bearer token", "cookie"].map((item) => ({
  value: item,
}));
onMounted(() => { });

const queryOption = (queryString, cb, options) => {
  const results = queryString
    ? options.filter(createFilter(queryString))
    : options;
  cb(results);
};
const createFilter = (queryString) => {
  return (item) => {
    return item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
  };
};

const onRemoveItem = (index) => {
  tableData.splice(index, 1);
  if (tableData.length === 0) {
    tableData.push({ key: "", value: "" });
  }
};
const addItem = (index) => {
  tableData.push({ key: "", value: "" });
};
</script>

<template>
  <el-table :data="tableData" border style="width: 100%; height: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="名称">
      <template #default="scope">
        <el-autocomplete v-model="scope.row.key" :fetch-suggestions="(p1, p2) => queryOption(p1, p2, keys)"
          style="width: 100%" clearable placeholder="Please Input" />
      </template>
    </el-table-column>
    <el-table-column label="值">
      <template #default="scope">
        <el-autocomplete v-model="scope.row.value" :fetch-suggestions="(p1, p2) => queryOption(p1, p2, values)"
          style="width: 100%" clearable placeholder="Please Input" />
      </template>
    </el-table-column>
    <el-table-column prop="value" label="操作" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="addItem(scope.$index)">
          新增
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="onRemoveItem(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="less" scoped></style>