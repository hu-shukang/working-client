import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ja from 'dayjs/locale/ja';
import { Const, WEEKDAY } from './const.util';
import { DateInfo } from '@/models';

type DayjsDate = string | number | dayjs.Dayjs | Date | null | undefined;

class DateUtil {
  constructor() {
    dayjs.extend(timezone);
    dayjs.extend(utc);
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

  public getDateInfoList(date: string): DateInfo[] {
    if (!/^(?:19|20)\d{2}-(0[1-9]|1[0-2])$/.test(date)) {
      throw new Error('年月フォーマット不正');
    }
    let currentDay = dayjs(`${date}-01`).startOf('month');
    const endOfMonth = dayjs(date).endOf('month');
    const dateInfoList: DateInfo[] = [];
    while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth)) {
      dateInfoList.push({
        year: currentDay.year(),
        month: currentDay.month(),
        date: currentDay.date(),
        value: currentDay.format(Const.FORMAT_MM_DD),
        yyyyMMDD: currentDay.format(Const.FORMAT_YYYY_MM_DD),
        iso: currentDay.toISOString(),
        weekday: WEEKDAY[currentDay.day()],
        day: currentDay.day(),
        isSaturday: currentDay.day() === 6,
        isSunday: currentDay.day() === 0,
      });
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
}

export const dateUtil = new DateUtil();
