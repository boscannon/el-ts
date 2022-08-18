export interface GlobaActionsInterface {
  add: string
  edit: string
}

export interface GlobaListInterface<LIST> {
  total: number
  current_page: number
  data: LIST
}