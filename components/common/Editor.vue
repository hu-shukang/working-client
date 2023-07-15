<template>
  <ClientOnly>
    <div class="editor-wrapper">
      <mavon-editor
        v-model="content"
        language="ja"
        placeholder="編集"
        :toolbars-flag="false"
        :autofocus="false"
        :tab-size="4"
        :subfield="false"
        :default-open="readonly === true ? 'preview' : mode"
        :box-shadow="false"
      />
      <el-button v-if="!readonly" class="mode-btn" size="small" :icon="icon" @click="toggleModel">
        {{ mode === 'edit' ? 'プレビュー' : '編集' }}
      </el-button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { Hide, View } from '@element-plus/icons-vue';

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const content = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
  });
  const mode = ref<'edit' | 'preview'>('edit');
  const icon = computed(() => (mode.value === 'edit' ? View : Hide));

  const toggleModel = () => {
    if (mode.value === 'edit') {
      mode.value = 'preview';
    } else {
      mode.value = 'edit';
    }
  };
</script>

<style scoped lang="scss">
  .editor-wrapper {
    position: relative;
    .mode-btn {
      position: absolute;
      right: var(--el-secounday-padding);
      bottom: var(--el-secounday-padding);
      z-index: 2000;
    }
  }
</style>
