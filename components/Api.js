import { getAuthToken } from '../storage/StorageUtils';

const authBaseUrl = 'https://e9a89b11-f310-4634-b224-df16b90f9bd3.mock.pstmn.io';
const bookBaseUrl = 'https://e9a89b11-f310-4634-b224-df16b90f9bd3.mock.pstmn.io';

const headers = {
  'x-api-key': '37e332c8c96b471b9d92e2697df670d7',
};
const paths = {
  auth: { token: '/auth/token' },
  dates: '/dates',
  bookings: '/bookings',
};

const authorizationHeader = () => {
  return new Promise((res, rej) => {
    getAuthToken()
      .then((authToken) => {
        res(`Bearer ${getAuthToken()}`);
      })
      .catch(rej);
  });
}

const fns = {
  auth: {
    token: (username, password) => {
      return fetch(`${authBaseUrl}${paths.auth.token}`, {
        method: 'POST',
        headers: Object.assign({}, headers, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ email: username, password }),
      })
        .then(response => response.json())
        .catch(e => e);
    }
  },
  dates: (username, password) => {
    return authorizationHeader()
      .then((authHeader) => {
        return fetch(`${bookBaseUrl}${paths.dates}`, {
          method: 'GET',
          headers: Object.assign({}, headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          }),
        })
      })
      .then(response => response.json())
      .catch(e => e);
  },
  postBookings: (date, time) => {
    return authorizationHeader()
      .then((authHeader) => {
        return fetch(`${bookBaseUrl}${paths.bookings}`, {
          method: 'POST',
          headers: Object.assign({}, headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          }),
          body: JSON.stringify({ date, time }),
        })
      })
      .then(response => response.json())
      .catch(e => e);
  },
  patchBookings: (date, time, id) => {
    return authorizationHeader()
      .then((authHeader) => {
        return fetch(`${bookBaseUrl}${paths.bookings}/${id}`, {
          method: 'PATCH',
          headers: Object.assign({}, headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          }),
          body: JSON.stringify({ date, time }),
        })
      })
      .then(response => response.json())
      .catch(e => e);
  },
  deleteBookings: (id) => {
    return authorizationHeader()
      .then((authHeader) => {
        return fetch(`${bookBaseUrl}${paths.bookings}/${id}`, {
          method: 'DELETE',
          headers: Object.assign({}, headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          }),
        })
      })
      .then(response => response.json())
      .catch(e => e);
  },
};

export default fns;
