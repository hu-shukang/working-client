import jwtDecode from 'jwt-decode';
import { useIndexStore } from '~/stores/index.store';

class TokenUtil {
  public decode(idToken: string): any {
    return jwtDecode(idToken);
  }

  public decodeAndStore(idToken: string): any {
    const result = this.decode(idToken);
    const indexStore = useIndexStore();
    indexStore.user = {
      role: result['custom:role'],
      picture: result.picture,
      exp: result.exp,
      iat: result.iat,
      family_name: result.family_name,
      given_name: result.given_name,
      employeeCode: result['custom:employeeCode']
    };
  }
}

export const tokenUtil = new TokenUtil();
