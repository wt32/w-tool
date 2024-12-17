<script setup>
import { ref, onMounted, reactive } from "vue";
import { fetch } from "@tauri-apps/plugin-http";
import { useRoute } from "vue-router";
import Store from "../components/Store.vue";
const tableData = reactive([])
onMounted(() => { });
</script>

<template>
    <el-table :data="tableData" border style="width: 100%; height: calc(100% - 72px - 90px)">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="参数名称">
            <template #default="scope">
                <el-input v-model="scope.row.name" style="width: 100%" placeholder="Please input" />
            </template>
        </el-table-column>
        <el-table-column label="参数类型">
            <template #default="scope">
                <el-input v-model="scope.row.value" style="width: 100%" placeholder="Please input"
                    class="input-with-select">
                    <template #prepend>
                        <el-select v-model="scope.row.valueType" placeholder="Select" style="width: 75px">
                            <el-option label="文本" value="1" />
                            <el-option label="文件" value="2" />
                        </el-select>
                    </template>
                </el-input>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="参数值">
            <template #default="scope">
                <el-input v-model="scope.row.name" style="width: 100%" placeholder="Please input" />
            </template>
        </el-table-column>
        <el-table-column prop="value" label="操作" width="180">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="onRemoveItem(scope.$index)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="padding: 0px">
        <el-button type="primary" style="width: 100%" @click="onAddItem">
            添 加
        </el-button>
    </div>
</template>
<style lang="less" scoped></style>