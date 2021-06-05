import {request} from 'ice';

const bookService = () => {
    return {
        async getBookList() {
            return await request({
                url: '/books',
                method: 'GET',
            });
        },
    
        async getBooksByName(name) {
            return await request({
                url: `/booksByName/${name}`,
                method: 'GET',
            });
        },
    
        async getBooksByType(type) {
            console.log(`type`, type);
            return await request({
                url: `/booksByType/${type}`,
                method: 'GET',
            });
        },
    
        async getBooksByAuthor(author) {
            console.log(`author1`, author);
            return await request({
                url: `/booksByAuthor/${author}`,
                method: 'GET'
            });
        },
    
        async getBookByISBN(ISBN) {
            return await request({
                url: `/booksByISBN/${ISBN}`,
                method: 'GET'
            })
        },

        async getBookById(bookId) {
            return await request({
                url: `/booksById/${bookId}`,
                method: 'GET'
            })
        },

        async getBookTypeList() {
            return await request({
                url: '/bookTypes',
                method: 'GET'
            });
        },
    
        async addBook(data) {
            return await request({
                url: '/book',
                data: data,
                method: 'POST'
            });
        },
    
        async deleteBook(id) {
            return await request({
                url: `/book/${id}`,
                method: 'DELETE'
            });
        },
    
        async updateBook(data) {
            console.log(`data1`, data);
            return request({
                url: '/book',
                data,
                method:'PUT'
            });
        },
    }
}

export default bookService();