import page from 'page';
// import ActionTypes from './ActionTypes';

class CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    this._dispatcher = dispatcher;
    this._apiUtils = apiUtils;
  }

  redirect(url) {
    page.redirect(url);
  }
}

export default CommonActionCreators;
