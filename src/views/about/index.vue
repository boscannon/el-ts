<template>
  <div class="app-container">
    <!-- option -->
    <div class="filter-container">
      <el-input v-model="search" :placeholder="$t('Search')" @keyup.enter="filterList" style="width: 200px;" />
      <el-button type="primary" :icon="Search" @click="filterList">
        {{ $t('Search') }}
      </el-button>      
      <el-button type="primary" :icon="Plus" @click="$router.push({ name: 'AboutCreate' })">
        {{ $t('Add') }}
      </el-button>
    </div>

    <!-- table -->
    <el-table :data="table.data" style="width: 100%" v-loading="loading">
      <el-table-column label="id" prop="id" />
      <el-table-column label="title" prop="title" />
      <el-table-column label="author" prop="author" />
      <el-table-column label="actions">
        <template #default="scope">
          <el-button size="small" :icon="Edit" @click="$router.push({ name: 'AboutEdit', params: { id: scope.row.id }})">
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
import { ElMessage } from 'element-plus'
import { RowInterface } from './interface'
import { useI18n } from "vue-i18n"
import resource from "@/api/resource"

const { t } = useI18n();
const loading = ref<boolean>(false);
const search = ref<string>('');
const table = reactive<{ data: RowInterface[] }>({ data: [] });
const apiResource: resource = new resource('abouts');

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

const getList = () => {
  apiResource.list<{ q: string }>({ q: search.value })
  .then(({ data }) => table.data = data)
  .finally(() => loading.value = false);

}

getList()
</script>
