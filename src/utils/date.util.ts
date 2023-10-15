import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ja from 'dayjs/locale/ja';
import isBetween from 'dayjs/plugin/isBetween';
import { Const, WEEKDAY } from './const.util';
import { AttendanceItem, DateInfo } from '@/models';

type DayjsDate = string | number | dayjs.Dayjs | Date | null | undefined;

class DateUtil {
  constructor() {
    dayjs.extend(timezone);
    dayjs.extend(utc);
    dayjs.extend(isBetween);
    dayjs.tz.setDefault('Asia/Tokyo');
    dayjs.locale(ja);
  }

  public get(origin?: DayjsDate) {
    return dayjs(origin);
  }

  public unix(origin?: DayjsDate) {
    return dayjs(origin).unix();
  }

  public format(origin: DayjsDate, format: string = Const.FORMAT_YYYY_MM_DD) {
    return dayjs(origin).format(format);
  }

  public toDateInfo(date: DayjsDate) {
    const d = dayjs(date);
    return {
      year: d.year(),
      month: d.month(),
      date: d.date(),
      value: d.format(Const.FORMAT_MM_DD),
      yyyyMMDD: d.format(Const.FORMAT_YYYY_MM_DD),
      iso: d.toISOString(),
      weekday: WEEKDAY[d.day()],
      day: d.day(),
      isSaturday: d.day() === 6,
      isSunday: d.day() === 0,
    };
  }

  public getDateInfoList(date: string): DateInfo[] {
    if (!/^(?:19|20)\d{2}-(0[1-9]|1[0-2])$/.test(date)) {
      throw new Error('年月フォーマット不正');
    }
    let currentDay = dayjs(`${date}-01`).startOf('month');
    const endOfMonth = dayjs(date).endOf('month');
    const dateInfoList: DateInfo[] = [];
    while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth)) {
      dateInfoList.push(this.toDateInfo(currentDay));
      currentDay = currentDay.add(1, 'day');
    }

    return dateInfoList;
  }

  public getDateInfoListWithEmpty(date: string): Array<DateInfo | null> {
    const list = this.getDateInfoList(date);
    const result: Array<DateInfo | null> = [];
    for (let i = 0; i < list[0].day; i++) {
      result.push(null);
    }
    result.push(...list);
    for (let i = list[list.length - 1].day; i < 6; i++) {
      result.push(null);
    }
    return result;
  }

  public calcMinutesInRange(
    start: string,
    end: string,
    range: string[] = ['00:00', '24:00'],
  ) {
    if (range.length != 2) {
      throw new Error('invalid arguments!');
    }
    const startTime = dayjs(`2023-10-05T${start}`);
    const endTime = dayjs(`2023-10-05T${end}`);
    const rangeStart = dayjs(`2023-10-05T${range[0]}`);
    const rangeEnd = dayjs(`2023-10-05T${range[1]}`);

    const overlapStart = startTime.isAfter(rangeStart) ? startTime : rangeStart;
    const overlapEnd = endTime.isBefore(rangeEnd) ? endTime : rangeEnd;

    const minutes = overlapEnd.diff(overlapStart, 'minute');
    return Math.max(0, minutes);
  }

  public formatMinutes(minutes: number | undefined) {
    if (!minutes) {
      return '';
    }
    const time = dayjs().startOf('day').add(minutes, 'minute');
    return time.format('HH:mm');
  }

  public getNightOvertime(item: AttendanceItem) {
    const { start, end, nightBreak } = item;
    if (start === '' || end === '') {
      return undefined;
    }
    const earlyMorningOvertime = dateUtil.calcMinutesInRange(start, end, [
      '00:00',
      '05:00',
    ]);
    const nightOvertime = dateUtil.calcMinutesInRange(start, end, [
      '22:00',
      '24:00',
    ]);
    const minutes = earlyMorningOvertime + nightOvertime - (nightBreak ?? 0);
    return minutes;
  }

  public getCalculateWorkingTime(item: AttendanceItem) {
    if (item.start === '' || item.end === '') {
      return undefined;
    }
    let minutes = dateUtil.calcMinutesInRange(item.start, item.end);
    minutes = minutes - (item.break ?? 0) - (item.nightBreak ?? 0);
    minutes = Math.floor(minutes / 15) * 15;
    return minutes;
  }

  public getActualWorkingTime(item: AttendanceItem) {
    if (item.start === '' || item.end === '') {
      return undefined;
    }
    let minutes = dateUtil.calcMinutesInRange(item.start, item.end);
    minutes = minutes - (item.break ?? 0) - (item.nightBreak ?? 0);
    return minutes;
  }

  public async getHoliday(year: string): Promise<Record<string, string>> {
    const resp = await fetch(`/public/holidays/${year}.json`);
    if (resp.ok) {
      return await resp.json();
    }
    return {};
  }
}

export const dateUtil = new DateUtil();
