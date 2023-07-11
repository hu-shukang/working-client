import { v4 } from 'uuid';
import underscore from 'underscore.string';

class StringUtil {
  public uuid() {
    return v4();
  }

  public isBlank(content?: string | undefined) {
    if (!content) {
      return true;
    }
    return underscore.isBlank(content);
  }

  public notBlank(content?: string | undefined) {
    return !this.isBlank(content);
  }

  public isNull(content: any) {
    return content === null || content === undefined;
  }

  public formatPrice(price: number, withPrefix = false) {
    let formattedPrice = price.toString();
    formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return withPrefix ? formattedPrice + '円' : formattedPrice;
  }

  public formatStation(model: { startStation: string; endStation: string }) {
    return model.startStation + '-' + model.endStation;
  }

  public formatStationWithTransit(model: { startStation: string; endStation: string; transitStation?: string[] }) {
    return [model.startStation, ...(model.transitStation ?? []), model.endStation].join('-');
  }

  public formatPercent(value: number) {
    return (value * 100).toFixed(0) + '%';
  }

  public formatHour(value: number) {
    return value + 'H';
  }
}

export const stringUtil = new StringUtil();
