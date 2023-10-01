import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ja from 'dayjs/locale/ja';
import { Const } from './const.util';

type DayjsDate = string | number | dayjs.Dayjs | Date | null | undefined;

class DateUtil {
  constructor() {
    dayjs.extend(timezone);
    dayjs.extend(utc);
    dayjs.tz.setDefault('Asia/Tokyo');
    dayjs.locale(ja);
  }

  public unix(origin?: DayjsDate) {
    return dayjs(origin).unix();
  }

  public format(origin: DayjsDate, format: string = Const.FORMAT_YYYY_MM_DD) {
    return dayjs(origin).format(format);
  }
}

export const dateUtil = new DateUtil();
