import type { DataBaseObject, User } from '.';

export enum ChatTypes {
  Single = 'single',
  Group = 'group',
}

export type Chat<T extends ChatTypes> = DataBaseObject & {
  id: number;
  type: T;
} & (T extends ChatTypes.Single
    ? { user: User }
    : {
        name: string;
        users: User[];
      });

export type AnyChat = {
  [K in ChatTypes]: Chat<K>;
}[ChatTypes];
