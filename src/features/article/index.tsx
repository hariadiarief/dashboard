import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getArticles } from '@/services/api/article'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { MessageSquareQuoteIcon, TimerIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router'

export default function Article() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getArticles'],
      queryFn: getArticles,
      initialPageParam: {
        'pagination[page]': 1,
        'populate[comments][populate][user]': '*'
      },
      getNextPageParam: (lastPage, pages, lastPageParam) => {
        console.log({ lastPage, pages, lastPageParam })

        return lastPage.meta.pagination.pageCount > pages.length
          ? {
              'pagination[page]': pages.length + 1,
              'populate[comments][populate][user]': '*'
            }
          : undefined
      }
    })

  const articles = useMemo(() => {
    if (!data || !Array.isArray(data.pages)) return []
    return data.pages.flatMap(val => val.data)
  }, [data])

  useEffect(() => {
    console.log({ data, data2: data?.pages, articles })
  }, [data, articles])

  if (Array.isArray(articles) && articles.length > 0) {
    return (
      <>
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(288px,_1fr))] gap-4'>
          {articles.map((article, index) => (
            <Link
              to={`/article/edit/${article.documentId}`}
              className='h-full w-full'
              key={article.documentId + index}
            >
              <Card className='flex h-full w-full flex-col'>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <img
                    className='h-[210px] w-full object-cover'
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
            </Link>
          ))}
        </div>
        <Button
          variant='outline'
          className='mt-4 w-full'
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </>
    )
  }
}
