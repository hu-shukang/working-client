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
