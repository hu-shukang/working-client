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

export const initWeeklyForm = (): WeeklyForm => {
  return {
    range: undefined,
    workContent: '',
    problemSolution: '',
    realization: '',
    talk: ''
  };
};
