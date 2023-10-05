export type AttendanceReportModel = {
  /** 年月 */
  date: string;
  /** 提出日時 */
  reportDate: number;
  /** 承認ステータス */
  approvalStatus: string;
  /** 承認者ID */
  approvalEmployeeId: string;
  /** 承認者名 */
  approvalEmployeeName: string;
  /** 承認日時 */
  approvalDate: number;
  /** 備考 */
  comment?: string;
};

export type AttendanceItem = {
  /** 日付 */
  dateInfo: DateInfo;
  /** 出勤時刻 HH:mm */
  start: string;
  /** 退勤時刻 HH:mm */
  end: string;
  /** 通常休憩(単位:分) */
  break?: number;
  /** 深夜休憩(単位:分) */
  nightBreak?: number;
  /** 休暇 */
  timeOff?: string;
  /** 在宅 */
  remotely?: boolean;
  /** 出発駅 */
  startStation?: string;
  /** 終点駅 */
  endStation?: string;
  /** 経由駅 */
  tractStation?: string[];
  /** 往復実費 */
  roundTrip?: number;
  /** 備考 */
  comment?: string;
};

export type DateInfo = {
  year: number;
  month: number;
  date: number;
  value: string;
  yyyyMMDD: string;
  iso: string;
  isSaturday: boolean;
  isSunday: boolean;
  weekday: string;
  day: number;
  holiday?: string;
};
