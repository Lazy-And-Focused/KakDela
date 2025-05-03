import { Router } from "express";

import { readdirSync } from "fs";
import { join, parse, resolve } from "path";

const DIR_PATH = process.env.NODE_ENV === "prod"
  ? "./dist/routes"
  : "./src/routes";
const ROUTER_FILE_BASE = process.env.NODE_ENV === "prod"
  ? "index.js"
  : "index.ts";
const DIR_EXCLUCE = join(DIR_PATH);

class Deployer {
  public constructor(public readonly router = Router()) {};

  private ReadFolder = (path: string) => {
    const dirName = parse(path).name;
    const dir = readdirSync(join(path));

    for (const file of dir) {
      try {
        readdirSync(join(path, file));
        
        this.ReadFolder(join(path, file));
      } catch {
        if (dirName === parse(DIR_PATH).name) continue;
        const relativePath = join(parse(path).dir.replace(DIR_EXCLUCE, ""), dirName)
          .replaceAll("\\", "/")
          .replaceAll("//", "/");

        const fileIsRouter = parse(file).base === ROUTER_FILE_BASE;
        if (!fileIsRouter) continue;

        const importedRouter = require(resolve(join(path, file))).default;
        
        console.log(`Загрузка роутинга ${file} в ${relativePath}`);
        this.router.use(relativePath, importedRouter);
      }
    };

    return this;
  };

  public execute() {
    return this.ReadFolder(DIR_PATH);
  };
};

export { Deployer };

export default Deployer;
