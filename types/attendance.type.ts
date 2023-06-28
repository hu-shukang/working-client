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
  /** 在宅 */
  remotely: boolean;
  /** 交通費 */
  transportationCosts: number;
  /** 備考 */
  comment: string;
};

/** 勤怠情報（１日分） */
export type AttendanceRowModel = {
  checked: boolean;
} & AttendanceInfo;

// Test Data
export const attendanceList = () => {
  const list: AttendanceRowModel[] = [];
  for (let i = 0; i < 30; i++) {
    list.push({
      checked: false,
      date: `2023-05-${(i + 1).toString().padStart(2, '0')}T06:28:43.227Z`,
      start: '09:00',
      end: '19:16',
      break: 60,
      nightBreak: 0,
      timeOff: '',
      remotely: i % 2 === 0,
      transportationCosts: 1000 + i,
      comment: ''
    });
  }
  return list;
};

export const emptyAttendanceRowModel = (date: string): AttendanceRowModel => {
  return {
    checked: false,
    date,
    start: '',
    end: '',
    break: 0,
    nightBreak: 0,
    timeOff: '',
    remotely: false,
    transportationCosts: 0,
    comment: ''
  };
};
