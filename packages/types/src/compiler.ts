import { Compiler } from "fbit-field/compiler";
import { KakDela } from ".";

if ((process.env.NODE_ENV = "rights_compiler")) {
  const rights = Object.fromEntries(
    (
      Object.keys(
        KakDela.Rights.CONSTANTS.object.available,
      ) as KakDela.Rights.Keys[]
    ).map((key) => [
      key,
      Object.keys(KakDela.Rights.CONSTANTS.object.available[key]),
    ]),
  );

  new Compiler(
    rights,
    __dirname + "\\index.ts",
    {},
    {
      writeInCompiler: true,
      name: "raw",
      defaultExportOn: false,
    },
  ).execute();
}