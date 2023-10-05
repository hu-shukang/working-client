<template>
  <div class="calendar">
    <div class="header">{{ yearMonth.replace('-', '年') + '月' }}</div>
    <div class="grid">
      <div class="weekday sunday">日</div>
      <div class="weekday">月</div>
      <div class="weekday">火</div>
      <div class="weekday">水</div>
      <div class="weekday">木</div>
      <div class="weekday">金</div>
      <div class="weekday saturday">土</div>
    </div>
    <div class="grid">
      <div v-for="(item, index) of dateInfoList" :key="item?.iso ?? index">
        <div
          v-if="item"
          :class="{
            range: type == 'range' && selections.includes(item.yyyyMMDD),
            start:
              type == 'range' &&
              selections.length > 0 &&
              selections[0] == item.yyyyMMDD,
            end:
              type == 'range' &&
              selections.length >= 2 &&
              selections[selections.length - 1] == item.yyyyMMDD,
          }"
        ></div>
        <div
          v-if="item"
          :class="{
            day: true,
            selected: selections.includes(item.yyyyMMDD) && type != 'range',
            sunday: item.isSunday,
            saturday: item.isSaturday,
          }"
          @click="selectHandler(item)"
        >
          {{ item.date }}
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Const, dateUtil } from '@/utils';
import { DateInfo } from '@/models';

const props = defineProps({
  yearMonth: {
    type: String,
    required: false,
    default: `${dateUtil.get().format(Const.FORMAT_YYYY_MM)}`,
  },
  type: {
    type: String as PropType<'single' | 'multi' | 'range'>,
    required: false,
    default: 'single',
  },
  modelValue: {
    type: Object as PropType<Date | Date[]>,
    required: true,
  },
});

const emits = defineEmits(['update:modelValue']);

const dateInfoList = computed(() =>
  dateUtil.getDateInfoListWithEmpty(props.yearMonth),
);

const selections = computed(() => {
  if (Array.isArray(props.modelValue)) {
    if (props.type === 'multi') {
      const arr = props.modelValue.map((d) =>
        dateUtil.get(d).format(Const.FORMAT_YYYY_MM_DD),
      );
      return arr;
    } else if (props.type === 'range') {
      const arr: string[] = [];
      if (props.modelValue.length > 0) {
        const length = props.modelValue.length;
        const start = dateUtil.get(props.modelValue[0]);
        const end = dateUtil.get(props.modelValue[length - 1]);
        for (
          let day = start;
          day.isBefore(end) || day.isSame(end);
          day = day.add(1, 'day')
        ) {
          arr.push(day.format(Const.FORMAT_YYYY_MM_DD));
        }
      }
      return arr;
    } else {
      return [];
    }
  } else {
    return [dateUtil.get(props.modelValue).format(Const.FORMAT_YYYY_MM_DD)];
  }
});

const selectHandler = (dateInfo: DateInfo) => {
  const value = dateUtil.get(dateInfo.yyyyMMDD).toDate();
  let newModelValue: any = undefined;
  if (props.type === 'single') {
    newModelValue = value;
  } else if (props.type === 'multi') {
    if (Array.isArray(props.modelValue)) {
      newModelValue = [...props.modelValue, value];
    } else {
      throw new Error('v-model must to be date array when type is multi');
    }
  } else {
    if (Array.isArray(props.modelValue)) {
      if (props.modelValue.length != 1) {
        newModelValue = [value];
      } else {
        if (props.modelValue[0] < value) {
          newModelValue = [props.modelValue[0], value];
        } else {
          newModelValue = [value, props.modelValue[0]];
        }
      }
    } else {
      throw new Error('v-model must to be date array when type is range');
    }
  }
  console.log(newModelValue);
  emits('update:modelValue', newModelValue);
};
</script>

<style scoped lang="scss">
@mixin absolute($left, $right, $top, $bottom) {
  position: absolute;
  left: $left;
  right: $right;
  top: $top;
  bottom: $bottom;
}
.calendar {
  --color-red: #f56c6c;
  --color-blue: #e6a23c;

  color: var(--el-color-info);
  width: 300px;
  box-shadow: var(--el-box-shadow-light);
  padding: 10px;
  .header {
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px 0;
      aspect-ratio: 1;
      position: relative;
    }
    .weekday {
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .saturday {
    color: var(--color-blue);
  }

  .sunday {
    color: var(--color-red);
  }

  .day {
    cursor: pointer;
    @include absolute(6px, 6px, 6px, 6px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    border-radius: 50%;
    &:hover {
      background-color: var(--el-color-primary-light-9);
      color: #ffffff;
    }
  }
  .selected,
  .start + .day,
  .end + .day {
    border-radius: 50%;
    @include absolute(6px, 6px, 6px, 6px);
    background-color: var(--el-color-primary);
    color: #ffffff;
  }

  .range {
    border-radius: 0;
    @include absolute(0px, 0px, 2px, 2px);
    background-color: var(--el-color-primary-light-9);
    color: #ffffff;
    &.start {
      content: '';
      position: absolute;
      @include absolute(2px, 0px, 2px, 2px);
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &.end {
      content: '';
      position: absolute;
      @include absolute(0px, 2px, 2px, 2px);
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }
}
</style>
