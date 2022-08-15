export interface GlobaActionsInterface {
  add: string
  edit: string
}

export interface GlobaListInterface<LIST> {
  data: {
    total: number
    current_page: number
    data: LIST
  }
  message: string
}