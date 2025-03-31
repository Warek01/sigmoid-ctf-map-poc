import {
  Blockquote,
  Button,
  Code,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'

import type { Task } from '@/types/task'

interface Props {
  task: Task
  onComplete: (task: Task) => void
  onClose: () => void
}

export default function TaskModal({ task, onComplete, onClose }: Props) {
  return (
    <Dialog.Root open={!!task} onOpenChange={onClose}>
      <Dialog.Content>
        {task && (
          <>
            <Dialog.Title>{task.title}</Dialog.Title>
            <div className="flex flex-col gap-1">
              <Dialog.Description>
                <Blockquote>{task.description}</Blockquote>
              </Dialog.Description>
              <Text as="p">Country: {task.country}</Text>
              <Text as="p">
                Complexity: <Code>{task.complexity}</Code>
              </Text>
            </div>

            <div className="py-5">
              <TextArea placeholder="Your submission" />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => onComplete(task)}
                disabled={task.completed}
              >
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
