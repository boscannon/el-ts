<template>
  <div class="app-container">
    <!-- option -->
    <div class="filter-container">
      <el-input v-model="search.query" :placeholder="$t('Search')" @keyup.enter="filterList" style="width: 200px;" />
      <el-button type="primary" :icon="Search" @click="filterList">
        {{ $t('Search') }}
      </el-button>      
      <el-button type="primary" :icon="Plus" @click="$router.push({ name: listRoute.create })">
        {{ $t('Add') }}
      </el-button>
    </div>

    <!-- table -->
    <el-table 
      :data="table.data" 
      style="width: 100%" 
      v-loading="loading" 
      @sort-change="handleSortChange"
      :default-sort="{ prop: search.sort, order: search.sort_by }"
    >
      <el-table-column label="#" type="index" />
      <el-table-column label="id" prop="id" sortable/>
      <el-table-column label="title" prop="title" sortable/>
      <el-table-column label="name" prop="name" sortable/>
      <el-table-column label="created_at" prop="created_at" sortable/>
      <el-table-column label="updated_at" prop="updated_at" sortable/>
      <el-table-column label="actions">
        <template #default="scope">
          <el-button size="small" :icon="Edit" @click="$router.push({ name: listRoute.edit, params: { id: scope.row.id }})">
            {{ $t('Edit') }}
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(scope.$index, scope.row)">
            {{ $t('Delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- page -->
    <div class="list-pagination-block">
      <el-pagination
        v-model:currentPage="table.current_page"
        :page-size="search.per_page"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.total"
        :page-sizes="[10, 50, 100, 200]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>    
    
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import { ElMessage,  } from 'element-plus'
import type { GlobaMessageInterface } from '@/interface'
import type { SearchInterface, ListInterface, RowInterface } from './action'
import { apiResource, listRoute } from './action'
// import { useI18n } from "vue-i18n"

// const { t } = useI18n();
const loading = ref<boolean>(false);
const search = reactive<SearchInterface>({ query: '', page: 1, per_page: 10, sort: 'updated_at', sort_by: 'descending' });
const table = ref<ListInterface>({ data: [], current_page: 1, total: 1 });

const handleDelete = (index: number, row: RowInterface) => {
  apiResource.delete<GlobaMessageInterface>(row.id)
  .then(response => {
    ElMessage({
      type: 'success',
      message: response.message
    })
    getList();
  })
}

const filterList = () => {
  search.page = 1;
  getList()
}

const getList = async () => {
  loading.value = true;
  table.value = await apiResource.list<SearchInterface, ListInterface>(search)
  loading.value = false;
}

const handleSizeChange = (val: number) => {
  search.per_page = val;
  getList()
}

const handleCurrentChange = (val: number) => {
  search.page = val;
  getList()
}

const handleSortChange = ({ prop, order }: { prop: string | null, order: string | null}) => {
  search.sort = prop;
  search.sort_by = order;
  getList()
}
getList()
</script>
