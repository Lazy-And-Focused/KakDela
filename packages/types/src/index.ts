import { UpdateWriteOpResult, DeleteResult } from "mongoose";
import { BitBuilder } from "fbit-field";

export namespace KakDela.Response {
  export type IResponse<T, K = null> = {
    text: string;
  } & (
    | {
        successed: false;

        resource: K;
        error: Error;
      }
    | {
        successed: true;

        resource: T;
        error: null;
      }
  );

  export type DataType = Exclude<keyof Database.Base, "auth">;

  export type GetData<T> = {
    type: DataType;
  } & (
    | {
        successed: false;
        resource: null;
        error: unknown;
      }
    | {
        successed: true;
        resource: T;
        error: null;
      }
  );

  export type CreateData<T> = {
    type: DataType;
    date: string;
  } & (
    | {
        successed: true;
        created_resource: T;
        error: null;
      }
    | {
        successed: false;
        created_resource: null;
        error: unknown;
      }
  );

  export type ChangeDataSuccessed<T> = {
    type: DataType;
    date: string;
    successed: true;
    error: null;
  } & (
    | {
        changed_resource: UpdateWriteOpResult;
        changed_resource_type: "update";
      }
    | {
        changed_resource: T;
        changed_resource_type: "resource";
      }
  );

  export type ChangeData<T> = {
    type: DataType;
    date: string;
  } & (
    | {
        successed: false;
        changed_resource: null;
        error: unknown;
      }
    | ChangeDataSuccessed<T>
  );

  export type DeleteDataSuccessed<T> = {
    type: DataType;
    successed: boolean;
    error: null;
    date: string;
  } & (
    | {
        deleted_resource_type: "delete";
        deleted_resource: DeleteResult;
      }
    | {
        deleted_resource_type: "resource";
        deleted_resource: T;
      }
  );

  export type DeleteData<T> = {
    type: DataType;
    date: string;
  } & (
    | {
        successed: false;
        deleted_resource: null;
        error: unknown;
      }
    | DeleteDataSuccessed<T>
  );
}

type Right<T extends string[] | readonly string[]> = Record<T[number], bigint>;

export namespace KakDela.Rights {
  export type My = Right<typeof My.ALL>;
  export namespace My {
    export const EXCLUDE = [
      "CHANGE_MESSAGES",
      "DELETE_MESSAGES",
      "ADMINISTATOR",
      "BANNED",
    ] as const;
    export const ALL = [
      ...EXCLUDE,
      "USER",
      "CREATE_MESSAGES",
      "READ_MESSAGES",
      "JOIN_CHATS",
      "CREATE_CHATS",
      "READ_ACCOUNTS",
    ] as const;

    const builder = new BitBuilder(My.ALL);

    export const DEFAULT: My = builder.execute(0n);
    export const AVAILABLE: My = builder.execute(0n, My.EXCLUDE);
    export const RAW_DEFAULT = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE = builder.resolve(AVAILABLE);
  }

  export type User = Right<typeof User.ALL>;
  export namespace User {
    export const EXCLUDE = ["CHANGE_MESSAGES", "DELETE_MESSAGES"] as const;
    export const ALL = [
      ...EXCLUDE,
      "FORWARD_MESSAGES",
      "REACT_MESSAGES",
      "READ_MESSAGES",
      "SEND_MESSAGES",
      "SEND_GIFS",
      "SEND_PHOTOS",
      "SEND_STICKERS",
      "SEND_VIDEOS",
      "SEND_VOICE_MESSAGES",
    ] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: User = builder.execute(My.DEFAULT);
    export const AVAILABLE: User = builder.execute(My.DEFAULT, User.EXCLUDE);
    export const RAW_DEFAULT = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE = builder.resolve(AVAILABLE);
  }

  export type Chat = Right<typeof Chat.ALL>;
  export namespace Chat {
    export const EXCLUDE = [
      "CREATOR",
      "ADMINISTATOR",
      "BANNED",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "RESTRICT_MEMBERS",
      "CREATE_INVITE_LINKS",
      "VIEW_MEMBERS",
    ] as const;
    export const ALL = [...EXCLUDE, "VIEW"] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Chat = builder.execute(User.DEFAULT);
    export const AVAILABLE: Chat = builder.execute(User.DEFAULT, Chat.EXCLUDE);
    export const RAW_DEFAULT = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE = builder.resolve(AVAILABLE);
  }

  export const CONSTANTS = {
    raw: {
      default: {
        my: My.RAW_DEFAULT,
        user: User.RAW_DEFAULT,
        chat: Chat.RAW_DEFAULT,
      } as const,

      available: {
        my: My.RAW_AVAILABLE,
        user: User.RAW_AVAILABLE,
        chat: Chat.RAW_AVAILABLE,
      } as const,
    } as const,

    object: {
      default: {
        my: My.DEFAULT,
        user: User.DEFAULT,
        chat: Chat.DEFAULT,
      } as const,

      available: {
        my: My.AVAILABLE,
        user: User.AVAILABLE,
        chat: Chat.AVAILABLE,
      } as const,
    } as const,
  } as const;

  // ## { COMPILED__WRITE_COMPILED_HERE } ## \\

  /**
   * - this file was auto genereted by compiler
   * - if you see inconsistencies: https://github.com/FOCKUSTY/bit-field/issues
   */
  export const raw = {
    my: {
      /** @value 1 */
      changeMessages: 1n << 0n,

      /** @value 2 */
      deleteMessages: 1n << 1n,

      /** @value 4 */
      administator: 1n << 2n,

      /** @value 8 */
      banned: 1n << 3n,

      /** @value 16 */
      user: 1n << 4n,

      /** @value 32 */
      createMessages: 1n << 5n,

      /** @value 64 */
      readMessages: 1n << 6n,

      /** @value 128 */
      joinChats: 1n << 7n,

      /** @value 256 */
      createChats: 1n << 8n,

      /** @value 512 */
      readAccounts: 1n << 9n,
    } as const,

    user: {
      /** @value 1024 */
      changeMessages: 1n << 10n,

      /** @value 2048 */
      deleteMessages: 1n << 11n,

      /** @value 4096 */
      forwardMessages: 1n << 12n,

      /** @value 8192 */
      reactMessages: 1n << 13n,

      /** @value 16384 */
      readMessages: 1n << 14n,

      /** @value 32768 */
      sendMessages: 1n << 15n,

      /** @value 65536 */
      sendGifs: 1n << 16n,

      /** @value 131072 */
      sendPhotos: 1n << 17n,

      /** @value 262144 */
      sendStickers: 1n << 18n,

      /** @value 524288 */
      sendVideos: 1n << 19n,

      /** @value 1048576 */
      sendVoiceMessages: 1n << 20n,
    } as const,

    chat: {
      /** @value 2097152 */
      creator: 1n << 21n,

      /** @value 4194304 */
      administator: 1n << 22n,

      /** @value 8388608 */
      banned: 1n << 23n,

      /** @value 16777216 */
      kickMembers: 1n << 24n,

      /** @value 33554432 */
      banMembers: 1n << 25n,

      /** @value 67108864 */
      restrictMembers: 1n << 26n,

      /** @value 134217728 */
      createInviteLinks: 1n << 27n,

      /** @value 268435456 */
      viewMembers: 1n << 28n,

      /** @value 536870912 */
      view: 1n << 29n,
    } as const,
  } as const;
  // ## { COMPILED__WRITE_COMPILED_HERE } ## \\
  export namespace Raw {
    // ## { COMPILED__WRITE_EXPORT_HERE } ## \\

    export type Keys = keyof typeof raw;
    export type Raw<T extends Keys> = (typeof raw)[T];
    export type RawKeys<T extends Keys> = keyof Raw<T>;
    // ## { COMPILED__WRITE_EXPORT_HERE } ## \\
  }

  export type Keys = keyof typeof CONSTANTS.object.available;
  export type Rights<T extends Keys> =
    keyof (typeof CONSTANTS.object.available)[T];
}

export namespace KakDela {
  export interface IUser {
    id: string;

    username: string;

    /** ISO format */
    created_at: string;

    avatar_url?: string;
    global_name?: string;

    /** @type {bigint} */
    rights: string;
    /** @key {user_id} @value {bigint} */
    users: Map<string, string>;
  }

  export const AUTH_TYPES = ["discord"] as const;
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
  }

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
  }

  export interface IChat {
    id: string;
    owner_id: string;

    members: string[];

    /** @key {member id} @value {bigint} */
    rights: Map<string, string>;
  }

  export namespace Database {
    export type DefaultOmit = "id" | "created_at" | "updated_at";

    export const MODELS = ["auth", "message", "user"] as const;

    export const EXISTS_CHECKING_KEYS = {
      auth: ["service_id"] as const,
      message: [] as const,
      user: ["username"] as const,
    } as const;

    export const DEFAULT = {
      auth: {} as const,
      user: {
        avatar_url: undefined,
        global_name: undefined,
      } as const,

      message: {
        attachments: [] as const,
      } as const,
    } as const;

    export type Base = {
      auth: IAuth;
      message: IMessage;
      user: IUser;
    };

    export type Create = {
      auth: Omit<IAuth, DefaultOmit>;
      message: Omit<IMessage, DefaultOmit>;
      user: Omit<IUser, DefaultOmit>;
    };
  }
}
