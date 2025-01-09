import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IRegisterPayload, register } from '@/services/api/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerMutation = useMutation<AxiosResponse, Error, IRegisterPayload>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/login')
    },
    onError: error => {
      console.error('Register gagal:', error)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    registerMutation.mutate({
      username: name,
      email,
      password
    })
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-full max-w-sm pt-6 md:max-w-xl'>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='Enter your username'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button type='submit' className='w-full'>
              Register
            </Button>
            <p className='text-center text-sm'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-500 hover:underline'>
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
