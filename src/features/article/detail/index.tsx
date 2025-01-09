import { getArticlebyID } from '@/services/api/article'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function DetailArticle() {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['getArticlebyID'],
    queryFn: () => getArticlebyID(id)
  })

  console.log({ data })

  return <div>DetailArticle</div>
}
