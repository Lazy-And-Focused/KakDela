import passport = require("passport");
import { Profile } from "passport";

import { Strategy, VerifyCallback, VerifyFunction } from "passport-oauth2";
import { KakDela } from "@kakdela/types";

import Api from "api/index.api";
import { Model, Database } from "database/database";

const api = new Api();

/**
 * @types [AuthTypes, string, string[]?] (first, second, third)
 * @first the method of authentication
 * @second the module in passport
 * @third a scopes
 */
const defaultPassports: [KakDela.AuthTypes, string, string[]?][] = [
  ["discord", "passport-discord", ["identify"]],
];

class Authenticator {
  private readonly _passport: passport.PassportStatic;

  public constructor(passport: passport.PassportStatic) {
    this._passport = passport;
  }

  public init = () => {
    console.log("Инициализация passport.");
    const errors: {[key: string]: Error[]} = {};
    let stack: number = 0;

    for (const passport of defaultPassports) {
      errors[passport[0]] = [];

      console.log(`Инициализация ${passport[0]} стратегии через ${passport[1]}.`);
      const strategy = require(passport[1]).Strategy;
      
      console.log("Загружаю API данные...");
      const data = api.getApi(passport[0].toUpperCase() as Uppercase<KakDela.AuthTypes>);

      if (!data.id) errors[passport[0]].push(new Error("Не найден id в API-данных " + passport[0] + "."));
      if (!data.secret) errors[passport[0]].push(new Error("Не найден secret в API-данных " + passport[0] + "."));
      if (!data.callback) errors[passport[0]].push(new Error("Не найден callback в API-данных " + passport[0] + "."));
      if (!data.api) errors[passport[0]].push(new Error("Не найден api в API-данных " + passport[0] + "."));

      try {
        this.strategy(strategy, {
          ...data,
          type: passport[0],
          scopes: passport[2]
        });
      } catch (error) {
        errors[passport[0]].push(error as Error);        
      }
    };

    Object.keys(errors).forEach(k => {
      if (errors[k].length === 0) return;
      stack++;

      console.error(errors[k].map(e => e.message).join("\n"));
    });

    if (stack !== 0) throw new Error("Erros was found.");
  };

  protected verify<Done extends (...data: any) => void = VerifyCallback>(type: KakDela.AuthTypes) {
    return async (access_token: string, refresh_token: string, profile: Profile, done: Done) => {
      try {
        const { id } = profile;

        const { data: user } = await new Model("user", {
          username: profile.username || profile.name?.givenName || profile.displayName,
        }).init();

        console.log(user);

        const { data: auth } = await new Model("auth", {
          access_token,
          refresh_token,
          service_id: id,
          profile_id: user.id,
          type: type
        }).init();

        return done(null, {
          id: auth.id,
          profile_id: auth.profile_id,
          service_id: auth.service_id,

          access_token: auth.access_token,
          refresh_token: auth.refresh_token,

          created_at: auth.created_at,
          type: auth.type
        } as KakDela.IAuth);
      } catch (error) {
        console.log(error);

        return done(error, null);
      }
    };
  }

  protected strategy(
    strategy: new (
      options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
      },
      verify: VerifyFunction
    ) => Strategy,
    api: {
      id: string;
      secret: string;
      callback: string;
      scopes?: string[];
      type: KakDela.AuthTypes;
      authURL?: string;
      tokenURL?: string;
    }
  ) {
    this._passport.use(
      new strategy(
        {
          clientID: api.id,
          clientSecret: api.secret,
          callbackURL: api.callback,
          scope: api.scopes
        },
        this.verify(api.type)
      )
    );
  }
}

export default Authenticator;
