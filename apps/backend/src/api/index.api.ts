import { Env } from "env";
import { Cache } from "cache-manager";

import { KakDela } from "@kakdela/types";

class Api {
  public readonly env = new Env().env;

  public useCache<T>(cacheManager: Cache, cache: string, type: KakDela.Response.GetData<T>["type"]) {
    const cacheEnabled = (!!cache && Boolean(cache) && cache !== "false") || typeof cache === "undefined";
    
    return async <K extends any[] = any[]>({
      getFunction,
      key,
      data
    }: {
      key: string,
      getFunction: (...data: K) => Promise<KakDela.Response.IResponse<T>>,
      data: K
    }): Promise<KakDela.Response.GetData<T>> => {
      if (cacheEnabled) {
        const valueFromCache = (await cacheManager.get<T>(key)) || false;
        
        const value = valueFromCache
          ? <KakDela.Response.GetData<T>>{ resource: valueFromCache, error: null, successed: true, type }
          : <KakDela.Response.GetData<T>>{ ...await getFunction(...data), type };
  
        if (!value.successed) return { ...value, type };
        if (!valueFromCache) cacheManager.set(key, value.resource);
  
        return value;
      };
  
      const value = await getFunction(...data);
      
      if (!value.successed) return { ...value, type };

      cacheManager.set(key, value.resource);
  
      return { ...value, type };
    };
  }

  public getApi(type: Uppercase<KakDela.AuthTypes>) {
    return {
      id: this.env[type + "_CLIENT_ID"],
      secret: this.env[type + "_CLIENT_SECRET"],
      callback: this.env[type + "_CALLBACK_URL"],
      api: this.env[type + "_API_URL"]
    };
  }
}

export default Api;
