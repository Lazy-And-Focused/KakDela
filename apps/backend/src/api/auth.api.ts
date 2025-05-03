import { KakDela } from "@kakdela/types";
import { NextFunction, Request, Response } from "express";

import passport = require("passport");

const abbreviations: Map<string, KakDela.AuthTypes> = new Map();

class AuthApi {
  private readonly _method: string;

  public constructor(method: string) {
    this._method = method;
  }

  static get methods(): Record<"abbreviations" | "methods", readonly string[]> {
    return {
      abbreviations: Array.from(abbreviations.keys()),
      methods: KakDela.AUTH_TYPES
    };
  }

  private getMethod(): [boolean, { [key: string]: unknown; method: string; body: any }] {
    if (!(<readonly string[]>KakDela.AUTH_TYPES).includes(this._method)) {
      const abbreviation = abbreviations.get(this._method)
      if (abbreviation) return [true, { body: null, method: abbreviation }];

      return [
        false,
        {
          body: {
            msg: "Sorry, but method " + this._method + " not found. Try next:",
            methods: KakDela.AUTH_TYPES
          },
          method: this._method
        }
      ];
    };

    return [true, { body: null, method: this._method }];
  }

  public auth(req: Request, res: Response, next: NextFunction): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) return res.send(body);

    passport.authenticate(method)(req, res, next);

    return;
  }

  public callback(
    req: Request,
    res: Response,
    next: NextFunction,
    callback: (...args: [any, KakDela.IAuth | null, any]) => any
  ): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) return res.send(body);

    passport.authenticate(method, callback)(req, res, next);

    return;
  }
}

export default AuthApi;
