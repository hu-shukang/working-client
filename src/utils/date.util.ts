import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ja from 'dayjs/locale/ja';
import isBetween from 'dayjs/plugin/isBetween';
import { Const, WEEKDAY } from './const.util';
import { DateInfo } from '@/models';

type DayjsDate = string | number | dayjs.Dayjs | Date | null | undefined;

class DateUtil {
  private readonly nightStart = '22:00';
  private readonly nightEnd = '05:00';

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

  public calcMinutesInTimeRange(start: string, end: string) {
    const startTime = dayjs(`2023-10-05T${start}`);
    const endTime = dayjs(`2023-10-05T${end}`);
    const midnight = dayjs('2023-10-05T00:00');
    const earlyMorning = dayjs(`2023-10-05T${this.nightEnd}`);
    const lateNight = dayjs(`2023-10-05T${this.nightStart}`);
    const nextMidnight = dayjs('2023-10-06T00:00');

    const earlyMorningOverlapStart = startTime.isAfter(midnight)
      ? startTime
      : midnight;
    const earlyMorningOverlapEnd = endTime.isBefore(earlyMorning)
      ? endTime
      : earlyMorning;
    const lateNightOverlapStart = startTime.isAfter(lateNight)
      ? startTime
      : lateNight;
    const lateNightOverlapEnd = endTime.isBefore(nextMidnight)
      ? endTime
      : nextMidnight;

    const earlyMorningMinutes = earlyMorningOverlapEnd.diff(
      earlyMorningOverlapStart,
      'minute',
    );
    const lateNightMinutes = lateNightOverlapEnd.diff(
      lateNightOverlapStart,
      'minute',
    );

    return Math.max(0, earlyMorningMinutes) + Math.max(0, lateNightMinutes);
  }
}

export const dateUtil = new DateUtil();
