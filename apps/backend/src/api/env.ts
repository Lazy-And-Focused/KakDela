import { config } from "dotenv";

config();

import { KakDela } from "@kakdela/types";

const REQUIRED = [
  "CLIENT_URL",
  "SESSION_SECRET",
  "MONGO_URL",
  "HASH_KEY"
] as const;

type AuthKeys = "CLIENT_ID"|"CLIENT_SECRET"|"CALLBACK_URL"|"API_URL";
type Required = (typeof REQUIRED)[number] | `${Uppercase<KakDela.AuthTypes>}_${AuthKeys}`;

const KEYS = [
  ...REQUIRED,
  "PORT",
  "COOKIE_AGE",
  "RESAVE",
  "SAVE_UNINITIALISED",
] as const;

type Keys = (typeof KEYS)[number] | `${Uppercase<KakDela.AuthTypes>}_${AuthKeys}`;

type Unrequired = Exclude<Keys, Required>;
const DEFAULT: Record<Unrequired, string> = {
  PORT: "9001",
  COOKIE_AGE: "604800000",
  RESAVE: "false",
  SAVE_UNINITIALISED: "false",
};

class Env {
  private readonly _env = process.env;
  private readonly _keys = Object.keys(process.env);

  public constructor() {
    this.init();
  }

  public readonly get = <
    T extends boolean = false,
    DefaultIncludes extends boolean = false,
    Key extends T extends false
      ? DefaultIncludes extends true ? Unrequired : Keys
      : string = T extends false
        ? DefaultIncludes extends true ? Unrequired : Keys
        : string
  >(
    key: Key,
    defaultIncludes: DefaultIncludes = false as DefaultIncludes
  ): Key extends Required ? string : DefaultIncludes extends true ? string : string|false => {
    return (
      this._env[key] || (
        defaultIncludes == true
          ? DEFAULT[key as Unrequired]
          : false
      )
    ) as any;
  }

  public getAll() {
    return {
      ...process.env,
      ...Object.fromEntries(KEYS.map(k => {
        return [k, this._env[k]];
      }))
    } as Record<Keys[number], string|undefined> & Record<Required[number], string>;
  }

  public getAllWithDefault() {
    return {
      ...process.env,
      ...Object.fromEntries(KEYS.map(k => {
        return [k, this._env[k] || (<{[key: string]: string}>DEFAULT)[k]];
      }))
    } as Record<Keys[number], string>;
  }

  public get env() {
    return this._env;
  }

  private init() {
    for (const key of REQUIRED) {
      const keys = []

      if (!this._keys.includes(key)) {
        keys.push(key)
      };

      if (keys.length !== 0) {
        throw new Error(`keys in your .env are not defined. Define next keys:\n${keys.join(", ")}`)
      };
    }
  }
}

export default Env;
