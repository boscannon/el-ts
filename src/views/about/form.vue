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
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { ActionsInterface } from '@/interface'
import type { RowInterface } from './interface'
import { useI18n } from "vue-i18n"
import resource from "@/api/resource"

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

const apiResource: resource = new resource('abouts');

const getData = () => {
  if(route.params.id){
    actionStatus.value = 'edit';
    apiResource.show(route.params.id)
    .then(({ data }) => ruleForm.value = data)
  }
}
getData();

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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    let result: any = '';
    loading.value = true;

    switch (actionStatus.value) {
      case 'add':
        result = apiResource.store<RowInterface>(ruleForm.value);
        break;
      case 'edit':
        result = apiResource.update<RowInterface>(route.params.id, ruleForm.value)
        break;
    }

    result.then(() => {
      ElMessage({
        type: 'success',
        message: t('Success', { action: actionMap[actionStatus.value] }),
      })
      back();
    })
    .finally(() => loading.value = false);
  })
}

const back = () => {
  router.push({ name: 'AboutList' })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>