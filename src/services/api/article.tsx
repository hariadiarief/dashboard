import { AxiosResponse } from 'axios'
import qs from 'qs'

import { API } from './api'

export interface IGetArticleParams {
  'pagination[page]'?: string | number
  'pagination[pageSize]'?: string | number
  'populate[comments][populate][user]'?: string | number
  'populate[user]'?: string | number
  'populate[category]'?: string | number
  'filters[title][$eqi]'?: string | number
  'filters[category][name][$eqi]'?: string | number
  populate?: string | number
}

export interface IGetArticleResponse {
  data: {
    comments: {
      content: string
      createdAt: string
      documentId: string
      id: number
      publishedAt: string
      updatedAt: string
    }[]
    id: boolean
    documentId: string
    title: string
    description: string
    cover_image_url: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export const getArticles = async ({
  pageParam
}: {
  pageParam?: IGetArticleParams
}): Promise<IGetArticleResponse> => {
  const defaultParams = {
    'pagination[page]': 1,
    'pagination[pageSize]': 10
  }

  const queryParams = !pageParam
    ? `?${qs.stringify(defaultParams, { encode: false })}`
    : `?${qs.stringify({ ...defaultParams, ...pageParam }, { encode: false })}`

  return await API.get(`/api/articles${queryParams}`)
}

export const getArticlebyID = async (
  documentId?: string
): Promise<AxiosResponse> => {
  return await API.get(`/api/articles/${documentId}`)
}
