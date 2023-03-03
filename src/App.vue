<template>
  <div class="common-layout">
    <el-container class='main' >
      <div v-if="sidebar" class="drawer-bg" @click="handleClickOutside" />
      <el-aside width="200px">
        Aside
        <!-- <sidebar class="sidebar-container" /> -->
      </el-aside>
      <el-container>
        <el-header>
          <!-- <headerbar/> -->
          Header
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>    
  </div>
</template>

<style lang="scss">
.app-container {
  padding: 20px;
}

.filter-container {
  padding-bottom: 10px;
}

.list-pagination-block{
  padding: 50px 0px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
const sidebar = ref(true);

const handleClickOutside = () => {
  sidebar.value = !sidebar.value;
}
</script>