import resource from "@/api/resource"
import type { GlobaListInterface } from '@/interface'

export type ListInterface = GlobaListInterface<RowInterface[]>

export interface RowInterface {
  id?: number
  title: string
  name: string
}

export const apiResource: resource = new resource('commodities');
