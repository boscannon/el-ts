<template>
  <div class="app-container">
    <!-- option -->
    <div class="filter-container">
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
import axios from 'axios'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { RowInterface } from './interface'
import { useI18n } from "vue-i18n"


const { t } = useI18n();
const loading = ref<boolean>(false);
const search = ref<string>('');
const table = reactive<{ data: RowInterface[] }>({ data: [] });

const handleDelete = (index: number, row: RowInterface) => {
  axios.delete(`http://localhost:3000/abouts/${ row.id }`)
  .then(response => {
    ElNotification({
      title: 'Success',
      type: 'success',
      message: t('Success', { action: t('Delete') }),
    })
    getList();
  })
  .catch(error => ElNotification({
    title: 'Error',
    type: 'error',
    message: error.message,
  }))
}

const getList = () => {
  loading.value = true;
  axios.get('http://localhost:3000/abouts', {
    params: { q: search.value }
  })
  .then(({ data }) => table.data = data)
  .catch(error => ElNotification({
    title: 'Error',
    type: 'error',
    message: error.message,
  }))
  .finally(() => loading.value = false);

}

getList()
</script>
