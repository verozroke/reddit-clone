"use client"

import { useCustomToast } from '@/hooks/use-custom-toast'
import { usePrevious } from '@mantine/hooks'
import { CommentVote, VoteType } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { PostCommentVoteRequest, PostVoteRequest } from '@/lib/validators/vote'
import { toast } from '@/hooks/use-toast'

interface CommentVotesProps {
  commentId: string,
  initialVotesAmount: number,
  initialVote?: Pick<CommentVote, 'type'>

}

const CommentVotes: FC<CommentVotesProps> = ({ commentId, initialVotesAmount, initialVote }) => {
  const { loginToast } = useCustomToast()
  const [votesAmount, setVotesAmount] = useState<number>(initialVotesAmount);

  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote)




  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostCommentVoteRequest = {
        commentId,
        voteType,
      }
      const { data } = await axios.patch('/api/subreddit/post/comment/vote', payload)

      return data as string
    },
    onError: (err: any, voteType: VoteType) => {
      if (voteType === 'UP') setVotesAmount(prev => prev - 1)
      else setVotesAmount(prev => prev + 1)

      // resetCurrentVote

      setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err?.response?.status === 401) {
          return loginToast()
        }
      }


      return toast({
        title: 'Some error occurred',
        description: 'Your vote was not registered. Please try again',
        variant: 'destructive'
      })

    },
    onMutate: (type: VoteType) => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined)
        if (type === 'UP') setVotesAmount(prev => prev - 1)
        else if (type === 'DOWN') setVotesAmount(prev => prev + 1)
      } else {
        setCurrentVote({ type })
        if (type === 'UP') setVotesAmount(prev => prev + (currentVote ? 2 : 1))
        else if (type === 'DOWN') setVotesAmount(prev => prev - (currentVote ? 2 : 1))
      }
    },
    onSuccess: () => {

    }
  })

  return <div className='flex gap-1'>
    <Button onClick={() => vote('UP')} size='sm' variant="ghost" aria-label='upvote'>
      <ArrowBigUp className={cn('h-5 w-5 text-zinc-700', {
        'text-emerald-500 fill-emerald-500': currentVote?.type === 'UP',
      })} />
    </Button>

    <p className='text-center py-2 font-medium text-sm text-zinc-900'>
      {votesAmount}
    </p>

    <Button onClick={() => vote('DOWN')} size='sm' variant="ghost" aria-label='downvote'>
      <ArrowBigDown className={cn('h-5 w-5 text-zinc-700', {
        'text-red-500 fill-red-500': currentVote?.type === 'DOWN',
      })} />
    </Button>
  </div>
}

export default CommentVotes