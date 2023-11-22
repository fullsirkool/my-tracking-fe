export class BasePagingResponse<T> {
  data: T[] = []
  page: number = 0
  size: number = 0
  totalPages: number = 0
  totalElement: number = 0
}

export class BasePagingDto {
  readonly page: number = 1
  readonly size: number = 9
}
