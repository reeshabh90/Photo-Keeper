export const environment = {
  production: true,
  API_BASE: 'https://jsonplaceholder.typicode.com',
  endpoints: {
    GET_USERS: {
      endpoint: '/users',
      type: 'GET'
    },
    GET_ALBUMS: {
      endpoint: '/albums',
      type: 'GET'
    },
    GET_PHOTOS: {
      endpoint: '/photos',
      type: 'GET'
    }
  }
};
