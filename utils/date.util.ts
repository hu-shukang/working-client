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

  public toHHmm(origin?: DayjsDate) {
    return dayjs(origin).format('HH:mm');
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

  public hhmmToDayjs(hhmm: string) {
    return dayjs(`2000/01/01T${hhmm}`);
  }

  public calcDaytimeActualWorking(attendanceRowModel: { start: string; end: string; break: number }) {
    let start = this.hhmmToDayjs(attendanceRowModel.start);
    let end = this.hhmmToDayjs(attendanceRowModel.end);
    const nightStart = this.hhmmToDayjs(ConstUtil.NIGHT_START_TIME);
    const nightEnd = this.hhmmToDayjs(ConstUtil.NIGHT_END_TIME);
    if (start.isBefore(nightEnd)) {
      start = nightEnd;
    }
    if (end.isAfter(nightStart)) {
      end = nightStart;
    }
    const period = end.diff(start, 'minute');
    return period - attendanceRowModel.break;
  }

  public calcNightActualWorking(attendanceRowModel: { start: string; end: string; nightBreak: number }) {
    const start = this.hhmmToDayjs(attendanceRowModel.start);
    const end = this.hhmmToDayjs(attendanceRowModel.end);
    const nightStart = this.hhmmToDayjs(ConstUtil.NIGHT_START_TIME);
    const nightEnd = this.hhmmToDayjs(ConstUtil.NIGHT_END_TIME);
    let period = 0;
    if (start.isBefore(nightEnd)) {
      period += nightEnd.diff(start, 'minute');
    }
    if (end.isAfter(nightStart)) {
      period += end.diff(nightStart, 'minute');
    }
    return period - attendanceRowModel.nightBreak;
  }

  public calcActualWorking(attendanceRowModel: { start: string; end: string; break: number; nightBreak: number }) {
    const start = this.hhmmToDayjs(attendanceRowModel.start);
    const end = this.hhmmToDayjs(attendanceRowModel.end);
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
    const start = this.hhmmToDayjs(attendanceRowModel.start);
    const end = this.hhmmToDayjs(attendanceRowModel.end);
    const nightStart = this.hhmmToDayjs(ConstUtil.NIGHT_START_TIME);
    const nightEnd = this.hhmmToDayjs(ConstUtil.NIGHT_END_TIME);
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

  public toIOSDateString(origin: DayjsDate): string {
    return dayjs(origin).toISOString();
  }

  public inMonth(year: number, month: number, target: DayjsDate) {
    const date = dayjs(target);
    return date.get('year') === year && date.get('month') === month;
  }

  public inRange(range: [DayjsDate, DayjsDate], target: DayjsDate) {
    const t = dayjs(target).startOf('date');
    const start = dayjs(range[0]).startOf('date');
    const end = dayjs(range[1]).startOf('date');
    return !t.isBefore(start) && !t.isAfter(end);
  }

  public isSame(d1: DayjsDate, d2: DayjsDate, unit?: dayjs.OpUnitType) {
    const dj1 = dayjs(d1);
    const dj2 = dayjs(d2);
    return dj1.isSame(dj2, unit);
  }

  public isSameBefore(origin: DayjsDate, target: DayjsDate) {
    const dj1 = dayjs(origin);
    const dj2 = dayjs(target);
    return dj1.isSame(dj2) || dj1.isBefore(dj2);
  }
}

export const dateUtil = new DateUtil();
