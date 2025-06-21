import assert from "assert";

import { KakDela } from "..";

type IObject<T extends string = string> = Record<T, bigint>;

const executeObject = (actual: IObject, expected: IObject) => {
  Object.keys(actual).forEach((key) => {
    it(`Ключ "${key}" должен содержать "${actual[key]}"`, () => {
      assert.equal(actual[key], expected[key]);
    });
  });
};

const executeRights = <T extends string[] = string[]>({
  actual,
  exclude,
  rights,
}: {
  actual: IObject<T[number]>;
  exclude: T | Readonly<T>;
  rights: {
    default: IObject;
    available: IObject;
  };
}) => {
  describe("Default", () => {
    const expected: IObject = rights.default;

    console.log(expected);
    executeObject(actual, expected);
  });

  describe("Available", () => {
    const expected: IObject = rights.available;

    executeObject(
      Object.fromEntries(
        Object.keys(actual).map((k) => [
          k,
          exclude.includes(k) ? 0n : (<IObject>actual)[k],
        ]),
      ),
      expected,
    );
  });
};