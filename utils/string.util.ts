import underscore from 'underscore.string';

class StringUtil {
  public isBlank(content?: string | undefined) {
    if (!content) {
      return true;
    }
    return underscore.isBlank(content);
  }

  public isNull(content: any) {
    return content === null || content === undefined;
  }
}

export const stringUtil = new StringUtil();
