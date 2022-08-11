<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    status-icon
    v-loading="loading"
    @keyup.enter="submitForm(ruleFormRef)"
  >
    <el-form-item label="title" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="author" prop="author">
      <el-input v-model="ruleForm.author" />
    </el-form-item>    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{ actionMap[actionStatus] }}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">{{ $t('Reset') }}</el-button>
      <el-button @click="back" type="info">{{ $t('Back') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import type { ActionsInterface } from '@/interface'
import type { RowInterface } from './interface'
import { useI18n } from "vue-i18n"

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const actionMap: ActionsInterface = { add: t('Add'), edit: t('Edit') };
const actionStatus = ref<keyof ActionsInterface>('add');
const loading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RowInterface>({ 
  title: '',
  author: '',
})

const check = () => {
  if(route.params.id){
    actionStatus.value = 'edit';
    axios.get(`http://localhost:3000/abouts/${ route.params.id }`)
    .then(({ data }) => ruleForm.value = data)
    .catch(error => ElNotification({
      title: 'Error',
      type: 'error',
      message: error.message,
    }))
  }
}
check();

const rules = reactive<FormRules>({
  title: [
    { required: true, message: t('Required'), trigger: 'blur' },
    { min: 1, max: 10, message: t('Length Limit', { min: 1, max: 10 }), trigger: 'blur' },
  ],
  author: [
    { required: true, message: t('Required'), trigger: 'blur' },
    { min: 1, max: 50, message: t('Length Limit', { min: 1, max: 50 }), trigger: 'blur' },
  ],  
})

const submitForm = async (formEl: FormInstance) => {
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    switch (actionStatus.value) {
      case 'add':
        addRow();
        break;
      case 'edit':
        editRow();
        break;
    }
  })
}

const addRow = () => {
  loading.value = true;
  axios.post('http://localhost:3000/abouts', ruleForm.value)
  .then(response => {
    ElNotification({
      title: 'Success',
      type: 'success',
      message: t('Success', { action: actionMap[actionStatus.value] }),
    })
    back();
  })
  .catch(error => ElNotification({
    title: 'Error',
    type: 'error',
    message: error.message,
  }))
  .finally(() => loading.value = false);
}

const editRow = () => {
  console.log('editRow');
  axios.put(`http://localhost:3000/abouts/${ route.params.id }`, ruleForm.value)
  .then(response => {
    ElNotification({
      title: 'Success',
      type: 'success',
      message: t('Success', { action: actionMap[actionStatus.value] }),
    })
    back();
  })
  .catch(error => ElNotification({
    title: 'Error',
    type: 'error',
    message: error.message,
  }))
  .finally(() => loading.value = false);
}

const back = () => {
  router.push({ name: 'AboutList' })
}

const resetForm = (formEl: FormInstance) => {
  formEl.resetFields()
}

</script>