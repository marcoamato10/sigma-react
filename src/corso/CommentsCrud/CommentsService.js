import axios from 'axios';

export class CommentsService {
  getComments(page, limit) {
    const url = `http://localhost:3000/comments?_page=${page + 1}&_limit=${limit}`
    return axios.get(url).then(res => ({
      data: res.data,
      totalRecords: res.headers['x-total-count']
    }))
  }

  createComments(comment) {
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
}