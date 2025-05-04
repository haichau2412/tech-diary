export const ERROR_CODE = {
  NOT_FOUND_VIDEO: 0,
  NOT_FOUND_USER: 1,
  OBSOLETE_DATA: 2,
  RESOURCE_EXISTED: 4,
  RUNTIME_ERROR: 8,
  DB_ACTION_ERROR: 100,
};

export interface Server_VideoInfo {
  videoId: string;
  defaultName: string;
}
