export class ConstUtil {
  public static readonly SETTLEMENT_UNIT = 15;
  public static readonly NIGHT_START_TIME = '22:00';
  public static readonly NIGHT_END_TIME = '05:00';
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
}
