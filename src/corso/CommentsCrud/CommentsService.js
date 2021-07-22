import axios from 'axios';

export class CommentsService {
  getComments(page, limit) {
    const url = `http://localhost:3000/comments?_page=${page + 1}&_limit=${limit}`
    return axios.get(url).then(res => ({
      data: res.data,
      totalRecords: res.headers['x-total-count']
    }))
  }

  createComments(data) {
    const url = 'http://localhost:3000/comments'
    return axios.post(url, data).then(res => ({
      data: res.data
    }));
  }

  deleteComm(data) {
    const url = `http://localhost:3000/comments/`
    return axios.delete(url + data.id).then(res => ({
      data: res.data
    }));
  }
}