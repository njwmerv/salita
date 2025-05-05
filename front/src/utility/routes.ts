// React Router Paths
export const HOME_PAGE_ROUTE: string = '/';
export const GAME_PAGE_ROUTE: string = '/game/:id';
export const GAME_PAGE_LINK: string = '/game/';
export const ARCHIVE_PAGE_ROUTE: string = '/archive/';

// Backend API Routes
export const BACKEND_API_ROOT: string = "http://localhost:8080";
export const GAME_MAPPING: string = BACKEND_API_ROOT + '/game';

export const DAY_ID_PARAM: string = 'dayID';
export const PLAYER_ID_PARAM: string = 'playerID';
export const WORD_PARAM: string = 'word';
export const ATTEMPTS_PARAM: string = 'attempts';

export const GAME_START_MAPPING: string = GAME_MAPPING + '/start';

export const GAME_ARCHIVE_MAPPING: string = GAME_MAPPING + '/archive';

export const GAME_GUESS_MAPPING: string = GAME_MAPPING + '/guess';