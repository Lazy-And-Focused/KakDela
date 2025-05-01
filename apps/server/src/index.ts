import Env from "./env";

import express from "express";

import connect from "./database/connect";
import App from "./app";

connect(new Env().get("MONGO_URL"));

export default new App(express()).listen();
