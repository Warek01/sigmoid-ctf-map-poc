import {
  Blockquote,
  Button,
  Code,
  Dialog,
  Text,
  TextArea,
} from '@radix-ui/themes'
import Markdown from 'react-markdown'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import { completeTask, selectTaskByCountry } from '@/slices/task.slice.ts'
import {
  selectCountry,
  selectSelectedCountry,
} from '@/slices/ui-state.slice.ts'

export default function TaskModal() {
  const dispatch = useAppDispatch()
  const selectedCountry = useAppSelector(selectSelectedCountry)
  const task = useAppSelector(selectTaskByCountry(selectedCountry))

  const handleComplete = () => {
    dispatch(completeTask(task!))
    dispatch(selectCountry(null))
  }

  return (
    <Dialog.Root
      open={!!task}
      onOpenChange={() => dispatch(selectCountry(null))}
    >
      <Dialog.Content>
        {task && (
          <>
            <Dialog.Title>{task.title}</Dialog.Title>
            <div className="flex flex-col gap-1">
              <Blockquote className="task-description">
                <Markdown>{task.description}</Markdown>
              </Blockquote>
              <Text as="p">Country: {task.country}</Text>
              <Text as="p">
                Complexity: <Code>{task.complexity}</Code>
              </Text>
            </div>

            <div className="py-5">
              <TextArea placeholder="Your submission" />
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={handleComplete} disabled={task.completed}>
                Complete
              </Button>
              <Dialog.Close>
                <Button color="gray">Cancel</Button>
              </Dialog.Close>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
