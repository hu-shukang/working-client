/** 週報Form */
export type WeeklyForm = {
  /** 期間 */
  range: [string, string] | undefined;
  /** 作業内容 */
  workContent: string;
  /** 課題・解決策 */
  problemSolution: string;
  /** 気づき */
  realization: string;
  /** 報告・相談 */
  talk: string;
};

export enum ApprovalStatus {
  /** 作成済 */
  CREATED = '000',
  /** 提出済 */
  SUBMISSION = '100',
  /** 承認済 */
  APPROVAL = '200'
}

/** 週報概要 */
export type WeeklySummary = {
  /** 開始日 */
  start: string;
  /** 終了日 */
  end: string;
  /** ステータス */
  status: ApprovalStatus;
  /** 提出日時 */
  submitDate?: string;
  /** 承認日時 */
  approvalDate?: string;
  /** 承認者の社員名 */
  approvalEmployee?: string;
  /** 承認者コメント */
  approvalComment?: string;
};

/** 週報概要(テーブル表示用) */
export type WeeklySummaryRowModel = {
  /** チェック */
  checked: boolean;
} & WeeklySummary;

export const weeklySummaryToRowModel = (item: WeeklySummary): WeeklySummaryRowModel => {
  return {
    checked: false,
    ...item
  };
};

export const initWeeklyForm = (): WeeklyForm => {
  return {
    range: undefined,
    workContent: '',
    problemSolution: '',
    realization: '',
    talk: ''
  };
};

// test data
export const initWeeklySummary = (): WeeklySummary[] => {
  return [
    {
      start: '2023-07-24T00:00:00',
      end: '2023-07-31T00:00:00',
      status: ApprovalStatus.CREATED
    },
    {
      start: '2023-07-17T00:00:00',
      end: '2023-07-23T00:00:00',
      status: ApprovalStatus.SUBMISSION,
      submitDate: '2023-07-23T10:00:00'
    },
    {
      start: '2023-07-10T00:00:00',
      end: '2023-07-16T00:00:00',
      status: ApprovalStatus.SUBMISSION,
      submitDate: '2023-07-16T12:00:00'
    },
    {
      start: '2023-07-01T00:00:00',
      end: '2023-07-09T00:00:00',
      status: ApprovalStatus.SUBMISSION,
      submitDate: '2023-07-09T13:00:00'
    },
    {
      start: '2023-06-26T00:00:00',
      end: '2023-06-30T00:00:00',
      status: ApprovalStatus.APPROVAL,
      submitDate: '2023-06-30T12:00:00',
      approvalDate: '2023-07-01T20:35:00',
      approvalEmployee: '胡 書康'
    },
    {
      start: '2023-06-19T00:00:00',
      end: '2023-06-25T00:00:00',
      status: ApprovalStatus.APPROVAL,
      submitDate: '2023-06-26T12:00:00',
      approvalDate: '2023-06-28T20:12:00',
      approvalEmployee: '胡 書康',
      approvalComment: 'コメント'
    },
    {
      start: '2023-06-12T00:00:00',
      end: '2023-06-18T00:00:00',
      status: ApprovalStatus.APPROVAL,
      submitDate: '2023-06-18T12:00:00',
      approvalDate: '2023-06-18T20:12:00',
      approvalEmployee: '胡 書康'
    },
    {
      start: '2023-06-05T00:00:00',
      end: '2023-06-11T00:00:00',
      status: ApprovalStatus.APPROVAL,
      submitDate: '2023-06-11T12:00:00',
      approvalDate: '2023-06-11T20:12:00',
      approvalEmployee: '胡 書康'
    },
    {
      start: '2023-06-01T00:00:00',
      end: '2023-06-04T00:00:00',
      status: ApprovalStatus.APPROVAL,
      submitDate: '2023-06-07T12:00:00',
      approvalDate: '2023-06-08T20:12:00',
      approvalEmployee: '胡 書康'
    }
  ];
};
