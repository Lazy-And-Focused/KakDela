import { RightsBuilder } from "./rights";

export namespace KakDela.Response {
  export type IResponse<T, K = null> =
    | {
        successed: false;

        data: K;
        error: string;
      }
    | {
        successed: true;

        data: T;
        error: null;
      };
}

export namespace KakDela.Rights {
  export namespace Types {
    export type My = Record<(typeof Rights.Constants.My.ALL)[number], bigint>;
    export type User = Record<(typeof Rights.Constants.User.ALL)[number], bigint>;
    export type Chat = Record<(typeof Rights.Constants.Chat.ALL)[number], bigint>;
  }

  export namespace Constants {
    export namespace My {
      export const ALL = [
        "USER",
        "ADMINISTATOR",
        "BANNED",
        "CREATE_MESSAGES",
        "CHANGE_MESSAGES",
        "READ_MESSAGES",
        "DELETE_MESSAGES",
        "JOIN_CHATS",
        "CREATE_CHATS",
        "READ_ACCOUNTS",
      ] as const;
      export const EXCLUDE = [
        "CHANGE_MESSAGES",
        "DELETE_MESSAGES",
        "ADMINISTATOR",
        "BANNED",
      ] as const;

      export const DEFAULT: Types.My = new RightsBuilder(My.ALL).execute(0n);
      export const AVAILABLE: Types.My = new RightsBuilder(My.ALL).execute(0n, My.EXCLUDE);
    }

    export namespace User {
      export const ALL = [
        "CHANGE_MESSAGES",
        "DELETE_MESSAGES",
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
      export const EXCLUDE = [
        "CHANGE_MESSAGES",
        "DELETE_MESSAGES"
      ] as const;

      export const DEFAULT: Types.User = new RightsBuilder(User.ALL).execute(My.DEFAULT,);
      export const AVAILABLE: Types.User = new RightsBuilder(User.ALL).execute(My.DEFAULT, User.EXCLUDE);
    }

    export namespace Chat {
      export const ALL = [
        "CREATOR",
        "ADMINISTATOR",
        "BANNED",
        "VIEW",
        "CREATE_INVITE_LINKS",
        "VIEW_MEMBERS",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "RESTRICT_MEMBERS",
      ] as const;
      export const EXCLUDE = [
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "RESTRICT_MEMBERS",
      ] as const;

      export const DEFAULT: Types.Chat = new RightsBuilder(Chat.ALL).execute(User.DEFAULT);
      export const AVAILABLE: Types.Chat = new RightsBuilder(Chat.ALL).execute(User.DEFAULT, Chat.EXCLUDE);
    }
  }
}

export namespace KakDela {
  export interface IUser {
    id: string;

    username: string;

    /** ISO format */
    created_at: string;

    avatar_url?: string;
    global_name?: string;

    /** bigint */
    rights: string;
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
