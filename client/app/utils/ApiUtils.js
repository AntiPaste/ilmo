import popsicle from 'popsicle';
import status from 'popsicle-status';
// import page from 'page';

// import CommonActionCreators from '../actions/CommonActionCreators';

class ApiUtils {
  constructor(apiBaseUrl) {
    this._apiBaseUrl = apiBaseUrl;
  }

  get(path) {
    const promise = popsicle
      .get({
        url: `${this._apiBaseUrl}${path}`,
      })
      .use(status());

    return this._addDebugging(promise);
  }

  post(path, data) {
    const promise = popsicle
      .post({
        url: `${this._apiBaseUrl}${path}`,
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .use(status());

    return this._addDebugging(promise);
  }

  put(path, data) {
    const promise = popsicle
      .put({
        url: `${this._apiBaseUrl}${path}`,
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    return this._addDebugging(promise);
  }

  patch(path, data) {
    const promise = popsicle
      .patch({
        url: `${this._apiBaseUrl}${path}`,
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    return this._addDebugging(promise);
  }

  delete(path) {
    const promise = popsicle
      .delete({
        url: `${this._apiBaseUrl}${path}`,
      });

    return this._addDebugging(promise);
  }

  _addDebugging(promise) {
    if (process.env.DEBUG) {
      promise.use((request) => {
        console.log('REQUEST', request);
      });

      return promise.then((response) => {
        console.log('RESPONSE', response);
        return response;
      });
    }

    return promise;
  }

}

export default ApiUtils;
