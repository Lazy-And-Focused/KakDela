import type { DataBaseObject, AnyChat } from '.';

export type User = DataBaseObject & {
  tag: string;
  avatar?: string;
  bio?: Partial<{
    first: string;
    last: string;
  }>;
};

export type SelfUser = User & {
  chats: AnyChat[];
};
