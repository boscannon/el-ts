import resource from "@/api/resource"
import type { GlobaSearchInterface, GlobaListInterface } from '@/interface'

export type ListInterface = GlobaListInterface<RowInterface[]>

export type SearchInterface = GlobaSearchInterface;

export interface RowInterface {
  id?: number
  title: string
  name: string
}

export const apiResource: resource = new resource('post');
export const listRoute: { list: string, create: string, edit: string } = {
  list: 'PostList',
  create: 'PostCreate',
  edit: 'PostEdit',
}
