export class RightsBuilder<T extends string> {
  public constructor(public readonly rights: (T[]|Readonly<T[]>)) {};
  /**
   * starts with offset bigint
   * @example
   * input: offset = 10n
   * 
   * output: rights = {
   *   someRight1: 1n << 10n,
   *   someRight2: 1n << 11n
   *   ...
   * }
   * 
   * @param [exclude=[]] prioritet in filters
   * @example
   * input:
   * exclude = ["someRight1", "someRight2"]
   * include = ["someRight1", "someRight3"]
   * 
   * output = {
   *   someRight1: 0n << 0n,
   *   someRight2: 0n << 1n,
   *   someRight3: 1n << 2n
   * }
   */
  public execute(
    offset: bigint|({[key: string]: bigint}|{readonly [key: string]: bigint}) = 0n,
    exclude: (T[]|readonly T[]) = [],
    include?: (T[]|readonly T[]),
  ): Record<T, bigint> {
    return Object.fromEntries(this.rights.map((right, index) => {
      const modifier = (this.resolveOffset(offset) + BigInt(index));
      
      if (include && !include.includes(right)) return [right, 0n << modifier];
      if (exclude.includes(right)) return [right, 0n << modifier];
      return [right, 1n << modifier];
    })) as Record<T, bigint>;
  };

  private logarithm2(bigint: bigint): bigint {
    return BigInt(bigint.toString(2).length-1);
  };

  private max(...values: bigint[]): bigint {
    return values.toSorted((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b){
        return -1;
      } else {
        return 0;
      }
    }).toReversed()[0];
  };

  private resolveOffset(offset: bigint|({[key: string]: bigint}|{ readonly [key: string]: bigint})): bigint {
    if (typeof offset === "bigint") return offset;
    const keys = Object.keys(offset);
    if (keys.length === 0) return 0n;
    return this.logarithm2(this.max(...keys.map((key) => offset[key]))) + 1n;
  }
};