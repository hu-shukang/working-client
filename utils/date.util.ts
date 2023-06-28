import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ja from 'dayjs/locale/ja';
import { AttendanceRowModel } from '~/types/attendance.type';

type DayjsDate = string | number | dayjs.Dayjs | Date | null | undefined;

class DateUtil {
  constructor() {
    dayjs.extend(timezone);
    dayjs.extend(utc);
    dayjs.tz.setDefault('Asia/Tokyo');
    dayjs.locale(ja);
  }

  public current(origin?: DayjsDate) {
    const today = dayjs(origin);
    return { year: today.year(), month: today.month(), day: today.date() };
  }

  public toYYYYMMDD(origin?: DayjsDate) {
    return dayjs(origin).format('YYYY-MM-DD');
  }

  public toMMDD(origin?: DayjsDate) {
    return dayjs(origin).format('MM月DD日');
  }

  public toWeekday(origin?: DayjsDate) {
    return dayjs(origin).format('ddd');
  }

  public minuteToHHmm(minute: number) {
    if (minute <= 0) {
      return '';
    }
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    return `${hoursString}:${minutesString}`;
  }

  public calcActualWorking(attendanceRowModel: AttendanceRowModel) {
    const start = dayjs(`2000/01/01T${attendanceRowModel.start}`);
    const end = dayjs(`2000/01/01T${attendanceRowModel.end}`);
    const period = end.diff(start, 'minute');
    return period - attendanceRowModel.break - attendanceRowModel.nightBreak;
  }

  public calcSettlement(actualWorking: number) {
    if (actualWorking % ConstUtil.SETTLEMENT_UNIT !== 0) {
      return (Math.floor(actualWorking / ConstUtil.SETTLEMENT_UNIT) + 1) * ConstUtil.SETTLEMENT_UNIT;
    }
    return actualWorking;
  }

  public calcNightOvertime(attendanceRowModel: AttendanceRowModel) {
    const start = dayjs(`2000/01/01T${attendanceRowModel.start}`);
    const end = dayjs(`2000/01/01T${attendanceRowModel.end}`);
    const nightStart = dayjs(`2000/01/01T${ConstUtil.NIGHT_START_TIME}`);
    const nightEnd = dayjs(`2000/01/01T${ConstUtil.NIGHT_END_TIME}`);
    let nightOvertimeMinute = 0;
    if (end.isAfter(nightStart)) {
      nightOvertimeMinute += nightStart.diff(end);
    }
    if (start.isBefore(nightEnd)) {
      nightOvertimeMinute += start.diff(nightEnd);
    }
    return nightOvertimeMinute;
  }

  public isWeekend(date: string) {
    const d = dayjs(date);
    const day = d.day();
    return day === 0 || day === 6;
  }

  public getDayCount(year: number, month: number): number {
    const date = dayjs();
    date.set('year', year);
    date.set('month', month);
    return date.daysInMonth();
  }

  public getIOSDateString(year: number, month: number, day: number): string {
    let date = dayjs();
    date = date.set('year', year);
    date = date.set('month', month);
    date = date.set('date', day);
    return date.toISOString();
  }
}

export const dateUtil = new DateUtil();
