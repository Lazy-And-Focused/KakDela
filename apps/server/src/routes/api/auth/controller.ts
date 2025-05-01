import { NextFunction, Request, Response } from "express";

import Api from "api/index.api";
import AuthApi from "api/auth.api";
import Hash from "api/hash";

const { env } = new Api();

class Controller {
  public constructor() {};

  public get(_req: Request, res: Response) {
    res.location("/discord");
  }

  public getMethod(req: Request, res: Response, next: NextFunction) {
    new AuthApi(req.params.method).auth(req, res, next);
  }

  public getCallback(req: Request, res: Response, next: NextFunction) {
    new AuthApi(req.params.method).callback(req, res, next, (...args) => {
      const user = args[1];

      if (!user) return;

      res.cookie(
        "id-token",
        `${user.id}-${user.profile_id}-${new Hash().execute(user.access_token)}`
      );
      res.redirect(env.CLIENT_URL);
    });
  }
}

export { Controller };

export default Controller;
