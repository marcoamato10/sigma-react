import axios from 'axios';

export class CommentsService {
  getComm(page, limit) {
    const url = `http://localhost:3000/comments?_page=${page + 1}&_limit=${limit}`
    return axios.get(url).then(res => ({
      data: res.data,
      totalRecords: res.headers['x-total-count']
    }))
  }

  createComm(comment) {
    const url = 'http://localhost:3000/comments'
    return axios.post(url, comment).then(res => ({
      data: res.data
    }));
  }

  deleteComm(comment) {
    const url = `http://localhost:3000/comments/`
    return axios.delete(url + comment.id).then(res => ({
      data: res.data
    }));
  }

  updateComm(comment) {
    const url = `http://localhost:3000/comments/`
    return axios.put(`${url}/${comment.id}`, comment).then(res => ({
      data: res.data
    }))
  }

  getPosts() {
    return axios.get('http://localhost:3000/posts').then(res => res.data);
  }
}