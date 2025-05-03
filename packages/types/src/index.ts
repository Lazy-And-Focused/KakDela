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
    export type Right<T extends string> = Record<T, bigint>;

    export namespace Types {
      export interface Default {

      }
    };

    export namespace Constants {
      export namespace My {
        // prettier-ignore-start
        export const DEFAULT = {
          USER:              1n << 0n,
          
          READ_MESSAGES:     1n << 1n,
          CREATE_MESSAGES:   1n << 2n,
          CHANGE_MESSAGE:    1n << 3n,
          DELETE_MESSAGE:    1n << 4n,
  
          JOIN_CHATS:        1n << 5n,
          CREATE_CHATS:      1n << 6n,
  
          READ_ACCOUNTS:     1n << 7n,
  
          ADMINISTATOR:      1n << 8n,
          BANNED:            1n << 9n,
        } as const;
  
        export const AVAILABLE = {
          USER:              1n << 0n,
          
          READ_MESSAGES:     1n << 1n,
          CREATE_MESSAGES:   1n << 2n,
          READ_ACCOUNTS:     1n << 7n,
          JOIN_CHATS:        1n << 5n,
          CREATE_CHATS:      1n << 6n,
  
          CHANGE_MESSAGE:    0n << 3n,
          DELETE_MESSAGE:    0n << 4n,
          ADMINISTATOR:      0n << 8n,
          BANNED:            0n << 9n,
        } as const;
        // prettier-ignore-end
      }

      export namespace Messages {
        export const DEFAULT = {
          CREATOR:           1n << 10n,
  
          READ:              1n << 11n,
          CHANGE:            1n << 12n,
          DELETE:            1n << 13n,
          
          REACT:             1n << 14n,
          REPLY:             1n << 15n,
          FORWARD:           1n << 16n,
        }
      }
    }
  }
};