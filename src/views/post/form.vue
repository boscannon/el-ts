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
    <el-form-item label="name" prop="name">
      <el-input v-model="ruleForm.name" />
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
import type { GlobaActionsInterface, GlobaMessageInterface } from '@/interface'
import type { RowInterface } from './action'
import { useI18n } from "vue-i18n"
import { apiResource, auditResource } from './action'

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const actionMap: GlobaActionsInterface = { add: t('Add'), edit: t('Edit') };
const actionStatus = ref<keyof GlobaActionsInterface>('add');
const loading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RowInterface>({ 
  title: '',
  name: '',
})

const getData = async () => {
  if(route.params.id){
    actionStatus.value = 'edit';
    ruleForm.value = await apiResource.show<RowInterface>(route.params.id)

    auditResource.list({
      table: 'posts',
      table_id: route.params.id,
    });
  }
}
getData();

const rules = reactive<FormRules>({
  title: [
    { required: true, message: t('Required'), trigger: 'blur' },
    { min: 1, max: 10, message: t('Length Limit', { min: 1, max: 10 }), trigger: 'blur' },
  ],
  name: [
    { required: true, message: t('Required'), trigger: 'blur' },
    { min: 1, max: 50, message: t('Length Limit', { min: 1, max: 50 }), trigger: 'blur' },
  ],    
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try{
    await formEl.validate();
    let result:  GlobaMessageInterface = { message: '' };
    loading.value = true;

    switch (actionStatus.value) {
      case 'add':
        result = await apiResource.store<RowInterface, GlobaMessageInterface>(ruleForm.value)
        break;
      case 'edit':
        result = await apiResource.update<RowInterface, GlobaMessageInterface>(route.params.id, ruleForm.value)
        break;
    }
    ElMessage({ type: 'success', message: result.message}) 
    back();
  }catch(e){
    console.log(e);
  }
  finally {
    loading.value = false
  }
}

const back = () => {
  router.push({ name: 'PostList' })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>