export class GeneralResponse<T> {
  value: T;
  valueType: any;
  status: number;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: string[];
  validationErrors: string[];
}

export class PageList<T> {
  items: T | null;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPages: number[];
  lastPages: number[];

  constructor() {
    this.hasPreviousPage = false;
  }
}
