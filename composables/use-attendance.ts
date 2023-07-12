import { useReportStore } from '~/stores/report.store';
import {
  AttendanceAddModel,
  AttendanceEditModel,
  AttendanceRowModel,
  emptyAttendanceList,
  emptyAttendanceRowModel,
  toAttendanceRowModel
} from '~/types/attendance.type';

export function useAttendance() {
  const reportStore = useReportStore();
  const list = reactive<AttendanceRowModel[]>(emptyAttendanceList(reportStore.year, reportStore.month));
  const selectedRows = computed(() => list.filter((item) => item.checked));

  const fetch = () => {
    list.splice(0, list.length);
    const emptyList = emptyAttendanceList(reportStore.year, reportStore.month);
    list.push(...emptyList);
  };

  const addAttendance = (model: AttendanceAddModel, holidays: any) => {
    if (model.isSingleDate) {
      for (let i = 0; i < list.length; i++) {
        const row = list[i];
        if (dateUtil.isSame(row.date, model.date, 'date')) {
          list[i] = toAttendanceRowModel(model, row.date, list[i].checked);
          break;
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        const row = list[i];
        if (dateUtil.inRange(model.range!, row.date)) {
          if (
            model.expectWeekendHoliday &&
            (dateUtil.isWeekend(row.date) || (holidays && holidays[dateUtil.toYYYYMMDD(row.date)]))
          ) {
            continue;
          }
          list[i] = toAttendanceRowModel(model, row.date, list[i].checked);
        }
      }
    }
  };

  const editAttendance = (model: AttendanceEditModel) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        list[i] = toAttendanceRowModel(model, list[i].date, false);
      }
    }
  };

  const clearAttendance = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        list[i] = emptyAttendanceRowModel(list[i].date);
      }
    }
  };

  const resetCheck = () => {
    list.forEach((item) => (item.checked = false));
  };

  const check = (indexList: number[], value: boolean) => {
    for (const index of indexList) {
      list[index].checked = value;
    }
  };

  return { list, fetch, selectedRows, addAttendance, editAttendance, clearAttendance, resetCheck, check };
}
