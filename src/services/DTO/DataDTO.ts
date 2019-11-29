export interface AddDataDto {
  accountId: string;
  data: string;
}

export interface UpdateDataDto {
  accountId: string;
  dataId: string;
  data: string;
}

export interface DeleteDataDto {
  accountId: string;
  dataId: string;
}
