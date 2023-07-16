import { useReportStore } from '~/stores/report.store';
import {
  ApprovalStatus,
  WeeklyAddModel,
  WeeklySummaryRowModel,
  initWeeklySummary,
  weeklySummaryToRowModel
} from '~/types/weekly.type';

export function useWeekly() {
  const reportStore = useReportStore();
  const list = reactive<WeeklySummaryRowModel[]>([]);
  const selectedRows = computed(() => list.filter((item) => item.checked));

  const year = computed({
    get: () => {
      const date = new Date();
      date.setFullYear(reportStore.year);
      return date;
    },
    set: (value) => (reportStore.year = value.getFullYear())
  });

  const deleteWeekly = () => {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].checked) {
        list.splice(i, 1);
      }
    }
  };

  const addWeekly = (model: WeeklyAddModel) => {
    list.push({
      checked: false,
      id: stringUtil.uuid(),
      start: model.range![0],
      end: model.range![1],
      status: ApprovalStatus.CREATED
    });
  };

  const check = (indexList: number[], value: boolean) => {
    for (const index of indexList) {
      list[index].checked = value;
    }
  };

  onMounted(() => {
    const testList = initWeeklySummary().map(weeklySummaryToRowModel);
    list.push(...testList);
  });

  return { list, selectedRows, year, deleteWeekly, addWeekly, check };
}
