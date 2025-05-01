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
  /* 
    ACCOUNTS
  */
  export interface IUser {
    id: string;

    username: string;

    created_at: string; // ISO format
    
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

    created_at: string; // ISO format

    type: AuthTypes;
  };

  /* 
    MESSAGES
  */
 export type IAttachment = string; // URL to attachment
 
 export interface IMessage {
    id: string;
    author_id: string;
    
    content: string;

    created_at: string; // ISO format
    updated_at: string; // ISO format

    attachments?: IAttachment[];
  };

  export namespace Database {
    export type DefaultOmit = "id"|"created_at"|"updated_at";

    export const MODELS = [
      "auth",
      "message",
      "user"
    ] as const;
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
};