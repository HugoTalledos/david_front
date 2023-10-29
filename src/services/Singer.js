import { api, escalateError, getResponseData } from './index';

export default class SingerApi {
  static createSinger(body) {
    return api.post('/singer', { ...body })
      .then(getResponseData)
      .catch(escalateError);
  }

  static getSingers() {
    return api.get('/singer')
      .then(getResponseData)
      .catch(escalateError);
  }

  static getSingerById(singerId) {
    return api.get(`/singer/${singerId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

  static deleteSinger({ singerId, status }) {
    return api.post(`/singer/${singerId}`, { status })
      .then(getResponseData)
      .catch(escalateError);
  }

  static updateSinger(body) {
    return api.put('/singer', { ...body })
      .then(getResponseData)
      .catch(escalateError);
  }
}
