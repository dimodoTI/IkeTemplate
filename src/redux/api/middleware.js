import {
  API_REQUEST,
  API_UPDATE,
  API_DELETE,
  API_ADD,
  API_ACTION,
  API_FUNCTION,
  showSpinner,
  hideSpinner
} from "./actions";

export const middleware = ({
  dispatch
}) => next => action => {
  if (action.type === API_REQUEST) {
    const {
      ODataFetch,
      params,
      onSuccess,
      onError
    } = action.meta;
    dispatch(showSpinner(ODataFetch))
    ODataFetch.get(params)
      .then(data => {
        dispatch(hideSpinner(ODataFetch))
        dispatch({
          type: onSuccess,
          payload: {
            send: params,
            receive: data
          }
        })
      })
      .catch(error => {
        dispatch(hideSpinner(ODataFetch))
        dispatch({
          type: onError,
          payload: error
        })
      });
  }

  if (action.type === API_UPDATE) {
    const {
      ODataFetch,
      body,
      onSuccess,
      onError
    } = action.meta;

    ODataFetch.patch(body)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: body,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }

  if (action.type === API_DELETE) {
    const {
      ODataFetch,
      body,
      onSuccess,
      onError
    } = action.meta;

    ODataFetch.delete(body)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: body,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }

  if (action.type === API_ADD) {
    const {
      ODataFetch,
      body,
      onSuccess,
      onError
    } = action.meta;

    ODataFetch.post(body)
      .then(data => {

        dispatch({
          type: onSuccess,
          payload: {
            send: body,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }

  if (action.type === API_ACTION) {
    const {
      ODataFetch,
      body,
      key,
      accion,
      onSuccess,
      onError
    } = action.meta;

    ODataFetch.action(accion, body, key)
      .then(data => {
        if (data.redirect) {
          location.href = data.redirect
        }
        dispatch({
          type: onSuccess,
          payload: {
            send: body,
            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }

  if (action.type === API_FUNCTION) {
    const {
      ODataFetch,
      funct,
      onSuccess,
      onError
    } = action.meta;

    ODataFetch.execute(funct)
      .then(data => {
        if (data.redirect) {
          location.href = data.redirect
        }
        dispatch({
          type: onSuccess,
          payload: {

            receive: data
          }
        })
      })
      .catch(error => {

        dispatch({
          type: onError,
          payload: {
            send: body,
            receive: error
          }
        })
      });
  }
  return next(action);
};