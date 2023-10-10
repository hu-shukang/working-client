export const Const = {
  FINISH: 'FINISH',
  PENDING: 'PENDING',
  // 日付
  FORMAT_YYYY_MM_DD_HH_mm_ss: 'YYYY-MM-DD HH:mm:ss',
  FORMAT_YYYY_MM_DD_HH_mm: 'YYYY-MM-DD HH:mm',
  FORMAT_YYYY_MM_DD: 'YYYY-MM-DD',
  FORMAT_YYYY_MM: 'YYYY-MM',
  FORMAT_MM_DD: 'MM-DD',
} as const;

export const TRIGGERS = {
  BLUR: 'blur',
  CHANGE: 'change',
  SUBMIT: 'submit',
};

export const MODE = {
  ADD: 'add',
  EDIT: 'edit',
};

export const PATTERN = {
  YYYY_MM: /^(?:19|20)\d{2}-(0[1-9]|1[0-2])$/,
};

export const WEEKDAY: any = {
  0: '日',
  1: '月',
  2: '火',
  3: '水',
  4: '木',
  5: '金',
  6: '土',
};

export const ROUTE_NAMES = {
  ATTENDANCE_PAGE: 'AttendancePage',
  ATTENDANCE_WRITE_PAGE: 'AttendanceWritePage',
};
