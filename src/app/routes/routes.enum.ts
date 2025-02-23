export enum RoutePath {
  EMPTY = '',
  SLASH = '/',
  WILDCARD = '**',
  PATHS_MATCH_FULL = 'full',
  PATHS_MATCH_PREFIX = 'prefix',
  ID_PATH = ':id',
  ORIGIN_PATH = ':origin',
  ERROR = 'error-page'
}
