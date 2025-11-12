export const USER_PREFERENCES = 'user_preferences';
export const ACCESS_TOKEN = 'access_token';
export const FIREBASE_TOKEN = 'firebase_token';
export const REFRESH_TOKEN = 'refresh_token';
export const USER_DETAILS = 'user_details';

export const nonAuthenticatedPaths: string[] = [
  '/',
  '/404',
  '/login',
  '/signup',
  '/forgetpassword',
  '/email-sent-confirm',
  '/reset-password',
  '/newpassword',
  '/pricing'
];

export const DATE_FORMAT = 'YYYY-MMM-DD';

export const MONTHS: Record<number, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const COLOR_THEME: Record<string, number> = {
  LIGHT: 1,
  DARK: 2,
  SYSTEM_DEFAULT: 3
};

export const FILE_EXTENTIONS = [
  'iconpdf',
  '.folder',
  '.docx',
  '.jpg',
  '.avif',
  '.png',
  '.jpeg',
  '.doc',
  '.pdf',
  '.mp4',
  '.webm',
  '.pptx',
  '.psd',
  '.skech',
  '.html',
  '.zip',
  '.mp3',
  '.ai',
  '.xd',
  '.xlsx',
  '.xls',
  '.figma'
];

export const imageExtensions = ['.jpg', '.png', '.jpeg'];
export const videoExtensions = ['.mp4', '.mov', '.mkv', '.webm'];
export const audioExtensions = ['.mp3'];
