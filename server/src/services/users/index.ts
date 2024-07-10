import axios from "axios";
import User from 'database/schemas/AuthUsers'
import { PartialUser } from "types/user";

export const getUserService = async (id: string) => {
    const user = await User.findById(id);

    if(!user)
        throw new Error('No user found');
    
    return (await axios.get<PartialUser[]>(`${process.env.DISCORD_API_URL||'https://discord.com/api/v9'}/users/@me`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    })).data;
};