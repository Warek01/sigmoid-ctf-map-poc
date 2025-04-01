import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Card, TextField } from '@radix-ui/themes'

import { useAppDispatch } from '@/hooks/redux.ts'
import { setUser } from '@/slices/user.slice.ts'
import { userMock } from '@/mocks/user.mock.ts'

interface LoginInputs {
  email: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginInputs>()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    dispatch(setUser(userMock))
  }

  return (
    <Card className="w-96 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center"
      >
        <TextField.Root
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full"
        />
        <TextField.Root
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full"
        />
        <Button type="submit">Log in</Button>
      </form>
    </Card>
  )
}
