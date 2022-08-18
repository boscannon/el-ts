import resource from "@/api/resource"
import type { GlobaListInterface } from '@/interface'

export type ListInterface = GlobaListInterface<RowInterface[]>

export interface SearchInterface {
  query: string
  page: number
  per_page: number
}

export interface RowInterface {
  id?: number
  title: string
  name: string
}

export const apiResource: resource = new resource('post');
