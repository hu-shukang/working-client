<template>
  <tr>
    <td class="text-center check">
      <el-checkbox v-model="checked" />
    </td>
    <td class="text-center index">{{ row.index + 1 }}</td>
    <td class="route">{{ route }}</td>
    <td class="text-end round-trip">{{ roundTrip }}</td>
    <td class="text-end month-train-pass">{{ monthTrainPass }}</td>
    <td class="comment">{{ row.comment }}</td>
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
  const route = computed(() => stringUtil.formatStationWithTransit(props.row));
  const roundTrip = computed(() => stringUtil.formatPrice(props.row.roundTrip, true));
  const monthTrainPass = computed(() =>
    props.row.monthTrainPass ? stringUtil.formatPrice(props.row.monthTrainPass, true) : '-'
  );
</script>
