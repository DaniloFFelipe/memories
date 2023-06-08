export const STATUS_CODES = {
  ERRORS: {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNATHOURIZED: 401,
    FORBBIDEN: 403,
  },
  SUCCESS: {
    OK: 200,
    NO_CONTENT: 204,
    CREATED: 201,
  },
}

export const STATUS_MESSAGES = {
  ERRORS: {
    'user-already-exists': 'user-already-exists',
    'invalid-password': 'invalid-password',
    'invalid-name': 'invalid-name',
    'invalid-email': 'invalid-email',
    'invalid-url': 'invalid-url',
    'invalid-credentials': 'invalid-credentials',
    'memory-not-found': 'memory-not-found',
    'user-isnt-owner': 'user-isnt-owner',
    'invalid-params': 'invalid-params',
  },
}
