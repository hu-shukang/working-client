<template>
  <div class="tree-container">
    <TreeNode :node="node" />
  </div>
</template>

<script setup lang="ts">
  import { DepartmentNode } from '~/types/management.type';

  defineProps<{ node: DepartmentNode }>();
</script>

<style scoped lang="scss">
  .tree-container {
    position: relative;
    display: block;
    width: 100%;
  }
</style>
