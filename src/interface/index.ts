export interface GlobaActionsInterface {
  add: string
  edit: string
}

export interface GlobaSearchInterface {
  query: string
  page: number
  per_page: number
}

export interface GlobaListInterface<T> {
  total: number
  current_page: number
  data: T
}

export interface GlobaMessageInterface {
  message: string
}