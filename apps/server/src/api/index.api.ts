import { KakDela } from "@kakdela/types";
import Env from "env";

class Api {
  public readonly env = new Env().env;

  public getApi(type: Uppercase<KakDela.AuthTypes>) {
    return {
      id: this.env[type + "_CLIENT_ID"] as string,
      secret: this.env[type + "_CLIENT_SECRET"] as string,
      callback: this.env[type + "_CALLBACK_URL"] as string,
      api: this.env[type + "_API_URL"] as string
    };
  }
}

export default Api;
