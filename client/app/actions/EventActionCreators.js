import CommonActionCreators from './CommonActionCreators';
import ActionTypes from './ActionTypes';
// import ErrorTypes from '../../shared/ErrorTypes';

// import { defineMessages } from 'react-intl';

class EventActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);
  }

  getEvents() {
    /* this._apiUtils.get('/events')
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.EVENTS_RECEIVE,
          events: response.body.events,
        });
      })
      .catch((error) => {
        console.log(error);
      }); */

    this._dispatcher.dispatch({
      type: ActionTypes.EVENTS_RECEIVE,
      events: [{
        'id': 'a7989a6d-1d4b-4b6e-b903-3fa053916402',
        'name': 'Martin bileet',
        'fields': [{
          'key': 'a14ced04-dae3-4625-9485-fb5c8a110bf9',
          'label': 'Etunimi',
          'type': 'text',
        }, {
          'key': '89a2e60c-42de-4afd-a001-40ad6d55f514',
          'label': 'Sukupuoli',
          'type': 'radio',
          'choices': ['Mies', 'Nainen', 'Koodari'],
        }, {
          'key': 'b66dd64e-e694-47c2-aebb-6fb0a9f43922',
          'label': 'Maa',
          'type': 'select',
          'choices': ['Suomi', 'Irak', 'Einari'],
        }],
      }],
    });
  }

  getEvent(id) {
    /* this._apiUtils.get(`/events/${id}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.EVENT_RECEIVE,
          event: response.body.event,
        });
      })
      .catch((error) => {
        console.log(error);
      }); */

    this._dispatcher.dispatch({
      type: ActionTypes.EVENT_RECEIVE,
      event: {
        'id': id,
        'name': 'Martin bileet',
        'fields': [{
          'key': 'a14ced04-dae3-4625-9485-fb5c8a110bf9',
          'label': 'Etunimi',
          'type': 'text',
        }, {
          'key': '89a2e60c-42de-4afd-a001-40ad6d55f514',
          'label': 'Sukupuoli',
          'type': 'radio',
          'choices': ['Mies', 'Nainen', 'Koodari'],
        }, {
          'key': 'b66dd64e-e694-47c2-aebb-6fb0a9f43922',
          'label': 'Maa',
          'type': 'select',
          'choices': ['Suomi', 'Irak', 'Einari'],
        }],
      },
    });
  }

  /* getExternalProduct(id) {
    this._apiUtils.get(`/products/${id}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_RECEIVE_EXTERNAL,
          product: response.body,
        });
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        default:
          this._dispatcher.dispatch({
            type: ActionTypes.PRODUCT_RECEIVE_EXTERNAL_ERROR,
            error: error,
          });
        }
      });
  }

  getChanges(id) {
    if (id === null) {
      this._dispatcher.dispatch({
        type: ActionTypes.PRODUCT_RECEIVE_CHANGES,
        changes: null,
      });

      return;
    }

    this._apiUtils.get(`/products/${id}/changes`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_RECEIVE_CHANGES,
          changes: response.body.changes,
        });
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        default:
          this._dispatcher.dispatch({
            type: ActionTypes.PRODUCT_RECEIVE_CHANGES_ERROR,
            error: error,
          });
        }
      });
  }

  installProduct(id) {
    const data = {
      id: id,
      status: 1,
    };

    this._apiUtils.patch(`/products/${id}`, data)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_INSTALLED,
          product: response.body,
        });

        this._dispatchMessage(
          'success',
          messages.installProductSuccess,
          { name: response.body.data.name }
        );
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        case ErrorTypes.ERROR_PACKAGE_IS_COMPLETED:
          this._dispatchMessage(
            'danger',
            messages.installProductPackageCompleted
          );

          break;

        case ErrorTypes.ERROR_PACKAGE_IS_ARCHIVED:
          this._dispatchMessage(
            'danger',
            messages.installProductPackageArchived
          );

          break;

        case ErrorTypes.ERROR_PRODUCT_NOT_FOUND:
          this._dispatchMessage('danger', messages.installProductNotFound);
          break;

        case ErrorTypes.ERROR_PRODUCT_NO_ACCESS:
          this._dispatchMessage('danger', messages.installProductNoAccess);
          break;

        default:
          console.error(error);
        }
      });
  }

  removeProduct(id) {
    this._apiUtils.delete(`/products/${id}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_REMOVED,
          product: response.body,
        });

        this._dispatchMessage(
          'success',
          messages.removeProductSuccess,
          { name: response.body.data.name }
        );
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        case ErrorTypes.ERROR_PACKAGE_IS_COMPLETED:
          this._dispatchMessage(
            'danger',
            messages.removeProductPackageCompleted
          );

          break;

        case ErrorTypes.ERROR_PACKAGE_IS_ARCHIVED:
          this._dispatchMessage(
            'danger',
            messages.removeProductPackageArchived
          );

          break;

        case ErrorTypes.ERROR_PRODUCT_NOT_FOUND:
          this._dispatchMessage('danger', messages.removeProductNotFound);
          break;

        case ErrorTypes.ERROR_PRODUCT_NO_ACCESS:
          this._dispatchMessage('danger', messages.removeProductNoAccess);
          break;

        default:
          console.error(error);
        }
      });
  }

  updateProduct(id) {
    this._apiUtils.post(`/products/${id}/update`, null)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_RECEIVE,
          product: response.body,
        });

        this._dispatchMessage(
          'success',
          messages.updateProductSuccess,
          { name: response.body.data.name }
        );
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        case ErrorTypes.ERROR_PACKAGE_IS_COMPLETED:
          this._dispatchMessage(
            'danger',
            messages.updateProductPackageCompleted
          );

          break;

        case ErrorTypes.ERROR_PACKAGE_IS_ARCHIVED:
          this._dispatchMessage(
            'danger',
            messages.updateProductPackageArchived
          );

          break;

        case ErrorTypes.ERROR_PRODUCT_NOT_FOUND:
          this._dispatchMessage('danger', messages.updateProductNotFound);
          break;

        case ErrorTypes.ERROR_PRODUCT_NO_ACCESS:
          this._dispatchMessage('danger', messages.updateProductNoAccess);
          break;

        default:
          console.error(error);
        }
      });
  }

  linkProduct(productID, externalID) {
    this._apiUtils.post(`/products/${productID}/link/${externalID}`, null)
      .then(() => {
        this._dispatchMessage(
          'success',
          messages.linkProductSuccess
        );
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        case ErrorTypes.ERROR_PRODUCT_NOT_FOUND:
          this._dispatchMessage(
            'danger',
            messages.linkProductNotFound
          );

          break;

        case ErrorTypes.ERROR_PRODUCT_EXTERNAL_NOT_FOUND:
          this._dispatchMessage(
            'danger',
            messages.linkProductExternalNotFound
          );

          break;

        default:
          console.error(error);
        }
      });
  }

  getSearchProduct(packageID, product) {
    this._dispatcher.dispatch({
      type: ActionTypes.PRODUCT_LOADING,
    });

    this._apiUtils.get(`/products/${product.data.id}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_RECEIVE,
          product: {
            ...product,
            data: response.body,
          },
        });
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        default:
          this._dispatcher.dispatch({
            type: ActionTypes.PRODUCT_RECEIVE_ERROR,
            error: error,
          });
        }
      });
  }

  searchGlobalProducts(id, query, page) {
    this._dispatcher.dispatch({
      type: ActionTypes.PRODUCT_GLOBAL_SEARCH_LOADING,
    });

    const escapedQuery = encodeURIComponent(query);
    this._apiUtils.get(`/products?id=${id}&query=${escapedQuery}&page=${page}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.PRODUCT_RECEIVE_GLOBAL_SEARCH,
          products: response.body,
        });
      })
      .catch((error) => {
        if (this._isAuthorizationError(error)) return;

        switch (error.message) {
        default:
          this._dispatcher.dispatch({
            type: ActionTypes.PRODUCT_RECEIVE_GLOBAL_SEARCH_ERROR,
            error: error,
          });
        }
      });
  }

  clearGlobalProductSearch() {
    this._dispatcher.dispatch({
      type: ActionTypes.PRODUCT_RECEIVE_GLOBAL_SEARCH,
      products: null,
    });
  } */
}

export default EventActionCreators;
