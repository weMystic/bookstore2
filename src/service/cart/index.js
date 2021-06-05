import Login from '@/pages/Login';
import {request} from 'ice';

const cartService = () => {
    return {
        async getCart() {
            return await request({
                url: '/cart',
                method: 'GET',
            });
        },

        async getCartItem(bookId) {
            return await request({
                url: `/cart/cartItem/${bookId}`,
                method: 'GET',
            })
        },

        async addToCart(bookId, num) {
            return await request({
                url: `/cart/cartItem?bookId=${bookId}&num=${num}`,
                method: 'POST'
            })
        },

    
        async deleteCartItem(bookId) {
            return await request({
                url: `/cart/cartItem/${bookId}`,
                method: 'DELETE',
            })
        },

        async changeItemCount(bookId, num) {
            return await request({
                url: `/cart/cartItemCount?bookId=${bookId}&num=${num}`,
                method: 'PUT'
            })
        },

        async checkItem() {
            return await request({
                url: '/cart/cartItemCheck',
                method: 'PUT'
            })
        }
    }
}

export default cartService();