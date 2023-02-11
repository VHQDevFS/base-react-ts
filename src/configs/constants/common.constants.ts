export const YESTERDAY = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

export const MAX_SIZE_IMAGE = 5 * 1024 * 1024;

export const MAX_SIZE_VIDEO = 5 * 1024 * 1024;

export const FILE_TYPES_IMAGES = ['jpeg', 'png', 'jpg', 'heic', 'heif'];

export const REGEX_FILE_TYPE_IMAGES = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpeg|.png|.jpg|.heic|.heif)$/i;

export const REGEX_FILE_TYPE_VIDEO = /([a-zA-Z0-9\s_\\.\-\(\):])+(.mp4)$/i;

export const REGEX_URL =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const FILES_TYPE_CSV_EXCEL = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/vnd.ms-excel',
];
