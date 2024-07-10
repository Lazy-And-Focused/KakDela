export type User = {
    id: string;
    avatar_url?: string;
    username: string;
    global_name?: string;
};

export interface AuthUser {
    id: string,

    discordId: string,
    accessToken: string,
    refreshToken: string,
};