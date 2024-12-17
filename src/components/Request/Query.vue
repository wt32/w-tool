<script setup>
import { ref, onMounted, reactive, defineProps } from "vue";
import { fetch } from "@tauri-apps/plugin-http";
import { useRoute } from "vue-router";
const tableData = reactive([{ key: "", value: "" }]);

const addItem = (index) => {
  tableData.splice(index + 1, 0, { key: "", value: "" });
};
const onRemoveItem = (index) => {
  tableData.splice(index, 1);
  if (tableData.length === 0) {
    tableData.push({ key: "", value: "" });
  }
};

onMounted(() => { });
</script>

<template>
  <el-table :data="tableData" border style="width: 100%; height: calc(100% )">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="key" label="名称">
      <template #default="scope">
        <el-input v-model="scope.row.key" style="width: 100%" placeholder="Please input" />
      </template>
    </el-table-column>
    <el-table-column label="值">
      <template #default="scope">
        <el-input v-model="scope.row.value" style="width: 100%" placeholder="Please input">
        </el-input>
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