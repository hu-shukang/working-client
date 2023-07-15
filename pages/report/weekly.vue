<template>
  <div>
    <Editor v-model="content" />
  </div>
</template>

<script setup lang="ts">
  const content = ref('');
</script>
