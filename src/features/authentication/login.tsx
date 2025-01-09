import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth/authContext'
import { ILoginPayload, ILoginResponse, login } from '@/services/api/auth'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Login() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: loginMutation, isPending } = useMutation<
    ILoginResponse,
    Error,
    ILoginPayload
  >({
    mutationFn: login,
    onSuccess: data => {
      const payload = {
        token: data.jwt,
        user: {
          username: data.user.username,
          email: data.user.email
        }
      }

      localStorage.setItem('auth', JSON.stringify(payload))

      dispatch({ type: 'login', payload })
      navigate('/')
    },
    onError: error => {
      console.error('Login gagal:', error)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation({
      identifier: email,
      password
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-full max-w-sm pt-6 md:max-w-xl'>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
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
              {isPending ? 'Loading...' : 'Login'}
            </Button>
            <p className='text-center text-sm'>
              Don't have an account?{' '}
              <Link to='/register' className='text-blue-500 hover:underline'>
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
