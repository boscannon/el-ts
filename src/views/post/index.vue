<template>
  <div class="app-container">
    <!-- option -->
    <div class="filter-container">
      <el-input v-model="search" :placeholder="$t('Search')" @keyup.enter="filterList" style="width: 200px;" />
      <el-button type="primary" :icon="Search" @click="filterList">
        {{ $t('Search') }}
      </el-button>      
      <el-button type="primary" :icon="Plus" @click="$router.push({ name: 'PostCreate' })">
        {{ $t('Add') }}
      </el-button>
    </div>

    <!-- table -->
    <el-table :data="table.data" style="width: 100%" v-loading="loading">
      <el-table-column label="id" prop="id" />
      <el-table-column label="title" prop="title" />
      <el-table-column label="name" prop="name" />
      <el-table-column label="actions">
        <template #default="scope">
          <el-button size="small" :icon="Edit" @click="$router.push({ name: 'PostEdit', params: { id: scope.row.id }})">
            {{ $t('Edit') }}
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(scope.$index, scope.row)">
            {{ $t('Delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import { ElMessage,  } from 'element-plus'
import type { ListInterface, RowInterface } from './action'
import { apiResource } from './action'
import { useI18n } from "vue-i18n"

const { t } = useI18n();
const loading = ref<boolean>(false);
const search = ref<string>('');
const table = reactive<{ data: RowInterface[], page: number }>({ data: [], page: 1 });

const handleDelete = (index: number, row: RowInterface) => {
  apiResource.delete(row.id)
  .then(response => {
    ElMessage({
      type: 'success',
      message: t('Success', { action: t('Delete') }),
    })
    getList();
  })
}

const filterList = () => {
  getList()
}

const getList = async () => {
  loading.value = true;
  let { data: { data, current_page } }: ListInterface = await apiResource.list<{ q: string }, ListInterface>({ q: search.value })
  table.data = data;
  table.page = current_page;
  loading.value = false;
}

getList()
</script>
