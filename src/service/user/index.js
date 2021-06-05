import Login from '@/pages/Login';
import {request} from 'ice';

const userService = () => {
    return {
        async login(data) {
            return await request({
                url: `/user/login?userId=${data.userId}&userPassword=${data.password}`,
                method: 'POST',
            })
        },

        async register(data) {
            console.log(`data`, data);
            return await request({
                url: '/user/regist',
                method: 'POST',
                data: data
            })
        },

        async getUserList() {
            return await request({
                url: '/users',
                method: 'GET',
            });
        },
    
        async getUsersByName(name) {
            return await request({
                url: `/usersByName/${name}`,
                method: 'GET',
            });
        },

        async getUsersById(userId) {
            return await request({
                url: `/usersById/${userId}`,
                method: 'GET',
            });
        },

        async updateUser(data) {
            console.log(`data1`, data);
            return request({
                url: '/user',
                data,
                method:'PUT'
            });
        },
    }
}

export default userService();