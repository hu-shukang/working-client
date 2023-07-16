<template>
  <details :id="node.id" :open="node.open">
    <summary>
      <img class="node-icon close" src="/assets/image/plus-square.svg" alt="" />
      <img class="node-icon open" src="/assets/image/minus-square.svg" alt="" />
      <span>{{ node.departmentName }}</span>
    </summary>
    <div class="folder">
      <template v-if="node.employees">
        <p v-for="e of node.employees" :key="e.id">{{ e.lastName + ' ' + e.firstName }}</p>
      </template>
      <template v-if="node.children">
        <TreeNode v-for="c of node.children" :key="c.id" :node="c" />
      </template>
    </div>
  </details>
</template>

<script setup lang="ts">
  import { DepartmentNode } from '~/types/management.type';

  defineProps<{ node: DepartmentNode }>();
</script>

<style scoped lang="scss">
  .node-icon {
    width: 15px;
    height: 15px;
    margin-right: var(--el-secounday-padding);
  }
  details {
    position: relative;
    width: auto;
    height: auto;
    overflow: hidden;
    max-height: 2.5em !important;
    transition: all 0.1s ease;
    ::-webkit-details-marker {
      display: none;
    }
    & > summary {
      position: relative;
      margin-top: var(--el-mini-padding);
      color: var(--el-color-white);
      padding: var(--el-mini-padding);
      background: var(--el-color-primary-light-3);
      display: flex;
      align-items: center;
    }
    &[open] > summary {
      background: var(--el-color-success-light-3);
      color: var(--el-color-white);
    }
  }

  .folder {
    margin: 0 0 var(--el-mini-padding) var(--el-main-padding);
    padding: var(--el-mini-padding) 0 var(--el-mini-padding) var(--el-main-padding);
    border-left: 1px var(--el-color-info) dashed;
    border-bottom: 1px var(--el-color-info) dashed;

    p {
      margin: 0;
      padding-top: var(--el-mini-padding);
      padding-bottom: var(--el-mini-padding);
    }
  }

  details[open] {
    height: auto;
    max-height: 99em !important;
    transition: all 1.2s ease;
    .node-icon.open {
      display: block;
    }
    .node-icon.close {
      display: none;
    }
  }
  details:not([open]) {
    .node-icon.open {
      display: none;
    }
    .node-icon.close {
      display: block;
    }
  }
  details:not([open]) .folder {
    height: 0px !important;
  }
  details > summary {
    list-style: square;
  }
  details > summary::marker, /* Latest Chrome, Edge, Firefox */
  details > summary::-webkit-details-marker /* Safari */ {
    display: none;
  }
</style>
