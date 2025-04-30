import passport = require("passport");
import { Profile } from "passport";

import { Auth } from "database/models/auth.model";
import { User } from "database/models/users.model";
import { Strategy, VerifyCallback, VerifyFunction } from "passport-oauth2";
import { KakDela } from "@kakdela/types";

import Api from "api/index.api";

const api = new Api();

/**
 * @types [AuthTypes, string, string[]?] (first, second, third)
 * @first the method of authentication
 * @second the module in passport
 * @third a scopes
 */
const defaultPassports: [KakDela.AuthTypes, string, string[]?][] = [
  ["discord", "passport-discord", ["profile"]],
];

class Authenticator {
  private readonly _passport: passport.PassportStatic;

  public constructor(passport: passport.PassportStatic) {
    this._passport = passport;
  }

  public init = () => {
    for (const passport of defaultPassports) {
      const strategy = require(passport[1]).Strategy;
      this.strategy(strategy, {
        ...api.getApi(passport[0].toUpperCase() as Uppercase<KakDela.AuthTypes>),
        type: passport[0],
        scopes: passport[2]
      });
    }
  };

  protected verify<Done extends (...data: any) => void = VerifyCallback>(type: KakDela.AuthTypes) {
    return async (access_token: string, refresh_token: string, profile: Profile, done: Done) => {
      try {
        const { id } = profile;

        const user = await User.create(<KakDela.IUser>{
          username: profile.username || profile.name?.givenName || profile.displayName
        });

        const auth = await Auth.create(<KakDela.IAuth>{
          access_token,
          refresh_token,
          service_id: id,
          profile_id: user.id,
          type: type
        });

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
