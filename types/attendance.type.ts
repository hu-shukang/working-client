/** 勤怠情報（１日分） */
export type AttendanceInfo = {
  /** 日付(ISO形式、例：2023-06-26T06:28:43.227Z) */
  date: string;
  /** 出社時刻 */
  start: string;
  /** 退社時刻 */
  end: string;
  /** 通常休憩(分) */
  break: number;
  /** 深夜休憩(分) */
  nightBreak: number;
  /** 休暇 */
  timeOff: string;
  /** 備考 */
  comment: string;
};

/** 勤怠情報（１日分） */
export type AttendanceRowModel = {
  checked: boolean;
} & AttendanceInfo;

/** 勤務情報編集Form */
export type AttendanceEditModel = {
  /** 出社時刻, 退社時刻 */
  working: [string, string];
  /** 通常休憩(分) */
  break: number;
  /** 深夜休憩(分) */
  nightBreak: number;
  /** 休暇 */
  timeOff: string;
  /** 備考 */
  comment: string;
};

/** 勤務情報作成Form */
export type AttendanceAddModel = {
  /** 日にちで入力か、範囲で入力か */
  isSingleDate: boolean;
  /** 日にち */
  date?: string | undefined;
  /** 日付範囲 */
  range?: [string, string];
  /** 週末、祝日を除くか */
  expectWeekendHoliday: boolean;
} & AttendanceEditModel;

export const initAttendanceAddModel = (): AttendanceAddModel => {
  return {
    isSingleDate: true,
    date: undefined,
    range: undefined,
    expectWeekendHoliday: true,
    working: ['2000-01-01T00:00:00.000Z', '2000-01-01T09:00:00.000Z'],
    break: 60,
    nightBreak: 0,
    timeOff: '',
    comment: ''
  };
};

export const initAttendanceEditModel = (): AttendanceEditModel => {
  return {
    working: ['2000-01-01T00:00:00.000Z', '2000-01-01T09:00:00.000Z'],
    break: 60,
    nightBreak: 0,
    timeOff: '',
    comment: ''
  };
};

export const toAttendanceRowModel = (model: AttendanceEditModel, date: string, checked = false): AttendanceRowModel => {
  return {
    checked: checked,
    date: date,
    start: model.working == null ? '' : dateUtil.toHHmm(model.working[0]),
    end: model.working == null ? '' : dateUtil.toHHmm(model.working[1]),
    break: model.break,
    nightBreak: model.nightBreak,
    timeOff: model.timeOff,
    comment: model.comment
  };
};

// Test Data
export const attendanceList = () => {
  const list: AttendanceRowModel[] = [];
  for (let i = 0; i < 30; i++) {
    list.push({
      checked: false,
      date: `2023-05-${(i + 1).toString().padStart(2, '0')}T00:00:00.000Z`,
      start: '09:00',
      end: '19:16',
      break: 60,
      nightBreak: 0,
      timeOff: '',
      comment: ''
    });
  }
  return list;
};

export const emptyAttendanceRowModel = (date: string): AttendanceRowModel => {
  return {
    checked: false,
    date: date,
    start: '',
    end: '',
    break: 0,
    nightBreak: 0,
    timeOff: '',
    comment: ''
  };
};
