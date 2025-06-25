import type { KakDela } from "@kakdela/types";

import Env from "./env";

const env = new Env();

const getPassportAuth = (type: Uppercase<KakDela.AuthTypes>) => {
  return {
    id: type + "_CLIENT_ID" as `${Uppercase<KakDela.AuthTypes>}_CLIENT_ID`,
    secret: type + "_CLIENT_SECRET" as `${Uppercase<KakDela.AuthTypes>}_CLIENT_SECRET`,
    callback: type + "_CALLBACK_URL" as `${Uppercase<KakDela.AuthTypes>}_CALLBACK_URL`,
    api: type + "_API_URL" as `${Uppercase<KakDela.AuthTypes>}_API_URL`
  } as const;
};

const getPassportAuthEnv = (type: Uppercase<KakDela.AuthTypes>) => {
  const data = getPassportAuth(type);

  return {
    id: env.get(data.id),
    secret: env.get(data.secret),
    callback: env.get(data.callback),
    api: env.get(data.api)
  } as const;
}

export { 
  getPassportAuth,
  getPassportAuthEnv
};
