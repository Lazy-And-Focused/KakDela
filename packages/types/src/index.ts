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

    created_at: string;

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

    attachments?: IAttachment[];
  };
}