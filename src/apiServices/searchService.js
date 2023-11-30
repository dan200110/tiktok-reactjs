import axios from 'axios';
import request from '~/utils/request';

export const searchUserName = async (q, type='less') => {
    try {
        const res = await request.get(`users/search`, {
            params: {
                q,
                type,
            }
        });
        return res.data.data
    } catch (error) {
        console.log(error);
    }
}