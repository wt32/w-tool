<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import { } from '@/utils'
import store from '@/stores'
const route = useRoute()
const router = useRouter()
const state = reactive({
    searchVal: {
        searchVal: "",
        sortField: "",
        sortDirection: "",
        algorithmType: "",
        createStartTime: "",
        createEndTime: "",
        sortField: "",
        sortDirection: "",
    },
    tableInfo: {
        loading: false,
        pagination: {
            pageSize: 10,
            total: 0,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            current: 1,
            showTotal: (total, range) => {
                return range[0] + "-" + range[1] + " 共" + total + "条";
            },
            size: "big",
            showQuickJumper: true,
            showSizeChanger: true,
        },
        tableData: [],
        tableColumn: [
            {
                title: "名称",
                dataIndex: "name",
                maxWidth: 120,
                ellipsis: true
            },
            {
                title: "操作",
                width: 280,
                fixed: "right",
            },
        ],
    }
})

onMounted(() => {
    getTableDataHandle()
})

const tableChange = (pagination, filters, sorter, { action, currentDataSource }) => {
    let orderMap = {
       "ascend": 'asc',
        'descend': 'desc'
    }
    if (action == 'sort') {
        if (sorter.order) {
            state.searchVal.sortDirection = orderMap[sorter.order]
            state.searchVal.sortField = sorter.field
        } else {
            state.searchVal.sortField = ""
            state.searchVal.sortDirection = ""
        }
    }
    if (action == 'paginate') {
        state.tableInfo.pagination.current = pagination.current
        state.tableInfo.pagination.pageSize = pagination.pageSize
    }
    getTableDataHandle();
}

const getTableDataHandle = () => {
    console.log('123asasaaa12');

    let params = handleRequestVal(state.searchVal);
    params.pageNo = state.tableInfo.pagination.current;
    params.pageSize = state.tableInfo.pagination.pageSize;
    getTableData(params).then((res) => {
        if (res.msg == "成功") {
            console.log(state.tableInfo.taskList);
            state.tableInfo.pagination.total = res.data.totalCount;
            state.tableInfo.taskList = res.data.lists.map(item => item);
            console.log(state.tableInfo.taskList);
        } else {
            userStore.sendMessage(res.msg || "请求失败", "error");
        }
    });
};

const handleSearch = () => {
    state.tableInfo.pagination.current = 1;
    getTableDataHandle();
};

const remove = (record) => {
    let params = {
        id: record.id
    }
    deleteTableData(params).then((res) => {
        if (res.msg == "成功") {
            getTableDataHandle()
        } else {
            userStore.sendMessage(res.msg || "请求失败", "error");
        }
    });
};

</script>
<template>
    <a-card style="width: 100%; height: 100vh">
        <div style="display: flex; height: 36px; margin-bottom: 20px;justify-content: space-between;">
            <div>
            </div>
            <div>
                名称：
                <a-input style="width: 200px; margin-right: 10px; height: 32px"
                    v-model:value="state.searchVal.searchVal" placeholder="请输入名称" />
                <a-button type="primary" @click="handleSearch" style="">查询</a-button>
            </div>
        </div>
        <template v-if="state.tableInfo.tableData.length > 0">

            <a-table :pagination="state.tableInfo.pagination" :scroll="{ y: 'calc(100vh - 208px)' }"
                :rowKey="(record) => record.id" :size="'small'" :dataSource="state.tableInfo.tableData"
                :columns="state.tableInfo.tableColumn" @change="tableChange">
                <template #bodyCell="{ column, record, text }">
                    <template v-if="column.title == '名称'">{{ record.name }}
                    </template>
                    <template v-if="column.title == '操作'">
                        <a-popconfirm v-if="record.userId == userStore.userInfo.id" title="确定删除" ok-text="确定"
                            cancel-text="取消" @confirm="remove(record.id)" @cancel="">
                            <span class="table-btn">删除</span>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </template>
        <a-empty v-else />
    </a-card>
</template>
<style lang='less' scoped>/** less format css code here */</style>