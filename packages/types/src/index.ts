export namespace KakDela.Response {
  export type IResponse<T, K=null> = ({
    successed: false

    data: K
    error: string
  } | {
    successed: true
    
    data: T
    error: null
  });
};

export namespace KakDela {
  export interface IUser {
    id: string;

    username: string;

    /** ISO format */
    created_at: string;
    
    avatar_url?: string;
    global_name?: string;
  };

  export const AUTH_TYPES = [
    "discord"
  ] as const;
  export type AuthTypes = (typeof AUTH_TYPES)[number];
  export interface IAuth {
    id: string;
    
    service_id: string;
    profile_id: string;
    
    access_token: string;
    refresh_token: string;

    /** ISO format */
    created_at: string;

    type: AuthTypes;
  };

  /** URL to attachment */
  export type IAttachment = string;
 
  export interface IMessage {
    id: string;
    author_id: string;
    
    content: string;

    /** ISO format */
    created_at: string;
    /** ISO format */
    updated_at: string;

    attachments: IAttachment[];
  };

  export interface IChat {
    id: string;
    owner_id: string;

    members: string[];
  }

  export namespace Database {
    export type DefaultOmit = "id"|"created_at"|"updated_at";

    export const MODELS = [
      "auth",
      "message",
      "user"
    ] as const;

    export const EXISTS_CHECKING_KEYS = {
      auth: [ "service_id" ] as const,
      message: [] as const,
      user: [ "username" ] as const
    } as const;
    
    export const DEFAULT = {
      auth: {} as const,
      user: {
        avatar_url: undefined,
        global_name: undefined
      } as const,
      
      message: {
        attachments: [] as const
      } as const,
    } as const;

    export type Base = {
      auth: IAuth,
      message: IMessage,
      user: IUser,
    }

    export type Create = {
      auth: Omit<IAuth, DefaultOmit>
      message: Omit<IMessage, DefaultOmit>
      user: Omit<IUser, DefaultOmit>
    }
  }

  export namespace Rights {
    export class Builder<T extends string> {
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

    export namespace Types {
      export type My = Record<(typeof Rights.Constants.My.ALL)[number], bigint>;
      export type Message = Record<(typeof Rights.Constants.Message.ALL)[number], bigint>;
    };

    export namespace Constants {
      export namespace My {
        export const ALL = [
          "USER",
          
          "READ_MESSAGES",
          "CREATE_MESSAGES",
          "CHANGE_MESSAGE",
          "DELETE_MESSAGE",
          
          "JOIN_CHATS",
          "CREATE_CHATS",
          
          "READ_ACCOUNTS",
          "ADMINISTATOR",
          "BANNED"
        ] as const;
        export const EXCLUDE = [
          "CHANGE_MESSAGE",
          "DELETE_MESSAGE",
          "ADMINISTATOR",
          "BANNED"
        ] as const;

        export const DEFAULT: Types.My = new Builder(My.ALL).execute(0n);
        export const AVAILABLE: Types.My = new Builder(My.ALL).execute(0n, My.EXCLUDE);
      }

      export namespace Message {
        export const ALL = [
          "CREATOR",
          "READ",
          "CHANGE",
          "DELETE",
          "REACT",
          "REPLY",
          "FORWARD"
        ] as const;

        export const EXCLUDE = [
          "CREATOR",
          "CHANGE",
          "DELETE"
        ] as const;

        export const DEFAULT: Types.Message = new Builder(Message.ALL).execute(My.DEFAULT);
        export const AVAILABLE: Types.Message = new Builder(Message.ALL).execute(My.DEFAULT, Message.EXCLUDE);
      }
    }
  }
};