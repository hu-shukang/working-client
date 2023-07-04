<template>
  <tr>
    <td class="text-center check">
      <el-checkbox v-model="checked" />
    </td>
    <td class="index">{{ row.index }}</td>
    <td class="route">{{ route }}</td>
    <td class="round-trip">{{ row.roundTrip }}</td>
    <td class="month-train-pass">{{ row.monthTrainPass }}</td>
  </tr>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { TrafficRowModel } from '~/types/traffic.type';

  const props = defineProps<{ index: number; row: TrafficRowModel }>();
  const emit = defineEmits(['check']);

  const checked = computed({
    get: () => props.row.checked,
    set: (value: boolean) => emit('check', props.index, value)
  });
  const route = computed(() => props.row.route.join('-'));
</script>
