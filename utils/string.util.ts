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
    formattedPrice = formattedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return withPrefix ? formattedPrice + '円' : formattedPrice;
  }
}

export const stringUtil = new StringUtil();
