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

import { createArticle } from '@/services/api/article'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  cover_image_url: z.string().url()
})

export default function CreateArticle() {
  const navigate = useNavigate()

  const createArticleMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: response => {
      navigate(`/article/${response.data.documentId}`)
    },
    onError: error => {
      console.error('Register gagal:', error)
    }
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      cover_image_url: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createArticleMutation.mutate(data)
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
        <Button type='submit'>Create</Button>
      </form>
    </Form>
  )
}
