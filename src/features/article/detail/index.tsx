import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getArticlebyID, IComment } from '@/services/api/article'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { MessageSquareQuoteIcon, PencilIcon, TimerIcon } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router'

export default function DetailArticle() {
  const { id } = useParams()
  const { state: comments = [] } = useLocation()

  const { data, isPending } = useQuery({
    queryKey: ['getArticlebyID'],
    queryFn: () => getArticlebyID(id)
  })

  console.log({ comments })

  const article = data?.data || []
  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='mb-4 flex justify-end'>
        <Link to={`/article/edit/${article.documentId}`}>
          <Button>
            Edit Article
            <PencilIcon className='ml-2' />
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className='h-full w-full object-cover'
            src={article.cover_image_url}
            alt=''
          />
        </CardContent>
        <CardFooter>
          <div className='flex flex-col space-y-1'>
            <div className='flex items-center'>
              <TimerIcon className='mr-2 w-[14px] text-muted-foreground' />
              {article.updatedAt ? (
                <span className='text-sm text-muted-foreground'>
                  {`update at : ${format(article.updatedAt, 'd MMM yyyy - hh:mm')}`}
                </span>
              ) : (
                <span className='text-sm text-muted-foreground'>
                  {`created at : ${format(article.createdAt, 'd MMM yyyy - hh:mm')}`}
                </span>
              )}
            </div>
            {article.comments?.length > 0 && (
              <div className='flex items-center'>
                <MessageSquareQuoteIcon className='mr-2 w-[14px] text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>{`${article.comments.length} comments`}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>

      {!comments?.length ? null : (
        <>
          <div className='mt-8 text-2xl'>Comments</div>
          <Separator className='mb-8 mt-2' />
          <div className='grid grid-cols-[repeat(auto-fill,_minmax(288px,_1fr))] gap-4'>
            {comments.map((comment: IComment) => (
              <Card className='flex h-full w-full flex-col' key={comment.id}>
                <CardHeader>
                  <CardTitle>{comment.user.username}</CardTitle>
                  <CardDescription>{comment.user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>{comment.content}</div>
                </CardContent>
                <CardFooter>
                  <div className='flex w-full flex-col space-y-1'>
                    <div className='flex items-center'>
                      <TimerIcon className='mr-2 w-[14px] text-muted-foreground' />
                      {comment.updatedAt ? (
                        <span className='text-sm text-muted-foreground'>
                          {`update at : ${format(comment.updatedAt, 'd MMM yyyy - hh:mm')}`}
                        </span>
                      ) : (
                        <span className='text-sm text-muted-foreground'>
                          {`created at : ${format(comment.createdAt, 'd MMM yyyy - hh:mm')}`}
                        </span>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  )
}
