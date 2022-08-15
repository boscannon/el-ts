import resource from "@/api/resource"
import type { GlobaListInterface } from '@/interface'

export interface ListInterface extends GlobaListInterface {
  data: RowInterface[]
}

export interface RowInterface {
  id?: number
  title: string
  name: string
}

export const apiResource: resource = new resource('post');
