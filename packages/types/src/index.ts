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

  export interface IAuth {
    id: string;
    serviceId: string;
    
    access_token: string;
    refresh_token: string;
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

  export interface ICreateMessageType {
    content: string;
    user_id: string;
    attachments?: IAttachment[];
  };
}