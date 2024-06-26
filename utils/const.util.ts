export class ConstUtil {
  public static readonly MENU_COLLAPSE_WIDTH = 1450;
  public static readonly SETTLEMENT_UNIT = 15;
  public static readonly NIGHT_START_TIME = '22:00';
  public static readonly NIGHT_END_TIME = '05:00';
  public static readonly REMOTELT_ALLOWANCE = 400;
  public static readonly FINISH = 'FINISH';
  public static readonly PENDING = 'PENDING';
  public static readonly TIME_OFF_OPTIONS = [
    { value: '1', label: '有休' },
    { value: '2', label: '半有休' },
    { value: '3', label: '休日出勤' },
    { value: '4', label: '振替休日' },
    { value: '5', label: '振替出勤' },
    { value: '6', label: '特別休暇' },
    { value: '7', label: '欠勤' },
    { value: '8', label: '早退' },
    { value: '9', label: 'その他' }
  ];

  public static readonly APPROVAL_STATUS_MAP = {
    '000': '作成済',
    '100': '提出済',
    '200': '承認済'
  };

  public static readonly DIRECTOR_MAP = {
    '000': 'Admin',
    '100': '本部長',
    '200': '部長',
    '300': '副部長',
    '400': '支店長',
    '500': '部長代理',
    '600': 'チームリーダー',
    '700': 'サブリーダー',
    '800': 'ユニットリーダー',
    '900': '一般社員'
  };
}
