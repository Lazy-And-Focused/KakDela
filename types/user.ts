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

export type PartialUser = {
    id: string,
    username: string,
    avatar?: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner?: string,
    accent_color: number,
    global_name?: string,
    banner_color: string,
    locale: string,
    verified: boolean
}