class StringUtil {
  public formatMoney(val?: number): string {
    if (!val) {
      return '';
    }
    const formatter = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(val);
  }
}

export const stringUtil = new StringUtil();
