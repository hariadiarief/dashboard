import { editArticle, getArticlebyID } from '@/services/api/article'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  cover_image_url: z.string().url()
})

export default function EditArticle() {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['getArticlebyID'],
    queryFn: () => getArticlebyID(id)
  })

  const editArticleMutation = useMutation({
    mutationFn: editArticle,
    onSuccess: () => {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    },
    onError: error => {
      console.error('Register gagal:', error)
    }
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data?.data?.title || '',
      description: data?.data?.description || '',
      cover_image_url: data?.data?.cover_image_url || ''
    }
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data?.data)
    }
  }, [data, form])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (id) editArticleMutation.mutate({ id, params: data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Fill Username' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='Fill Description' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cover_image_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>cover_image_url</FormLabel>
              <FormControl>
                <Input placeholder='Fill cover_image_url' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
