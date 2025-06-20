import Env from "./api/env";

import router from "./routes";

import Passport from "./strategies";

import express, { Express } from "express";
import session from 'express-session';
import cors from "cors";

const env = new Env();
const passport = new Passport();

class Session {
  public constructor() {};

  public create = () => {
    return session({
      secret: env.get("SESSION_SECRET"),
      resave: Boolean(env.get("RESAVE")),
      saveUninitialized: Boolean(env.get("SAVE_UNINITIALISED")),
      cookie: { maxAge: Number(env.get("COOKIE_AGE")) },
    });
  };
};

class App {
  public constructor(public readonly app: Express) {};

  public listen() {
    this.init();
    const port = env.get("PORT", true);

    this.app.listen(port, () => {
      console.log("Server starting: http://localhost:"+port);
    });
  }

  private init() {
    this.app.use(cors({  origin: [ env.get("CLIENT_URL") ], credentials: true }));

    this.app.use(new Session().create());
    
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    
    this.app.use(passport.session());
    this.app.use(passport.initialize());

    this.app.use("/", router);
  };
}

export { App };

export default App;
