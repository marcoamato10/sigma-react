import axios from 'axios';

export class CommentsService {
    getComments() {
        return axios.get('http://localhost:3000/comments').then(res => res.data);
    }

    createComments(data) {
        const url = 'http://localhost:3000/comments'
        return axios.post(url, data).then(res => ({
            data: res.data
        }));
    }
}