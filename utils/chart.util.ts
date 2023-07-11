class ChartUtil {
  public getBarColorBlue(value: number) {
    if (value >= 0.8) return '#337ecc';
    if (value >= 0.6) return '#79bbff';
    if (value >= 0.4) return '#a0cfff';
    return '#c6e2ff';
  }

  public getBarColorGreen(value: number) {
    if (value >= 0.8) return '#529b2e';
    if (value >= 0.6) return '#95d475';
    if (value >= 0.4) return '#b3e19d';
    return '#d1edc4';
  }
}

export const chartUtil = new ChartUtil();
