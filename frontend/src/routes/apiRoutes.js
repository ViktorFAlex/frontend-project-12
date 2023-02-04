const apiRoute = '/api/v1';

export default {
  loginRoute: () => [apiRoute, 'login'].join('/'),
  dataRoute: () => [apiRoute, 'data'].join('/'),
  signupRoute: () => [apiRoute, 'signup'].join('/'),
};
