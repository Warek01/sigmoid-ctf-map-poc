import { Checkbox, Code, Table } from '@radix-ui/themes'

import { useAppSelector } from '@/hooks/redux.ts'
import { selectTasks } from '@/slices/task.slice.ts'

export default function TasksPage() {
  const tasks = useAppSelector(selectTasks)

  return (
    <div className="px-4">
      <Table.Root variant="surface" className="my-3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Complexity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Complete</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.country}>
              <Table.RowHeaderCell>{task.country}</Table.RowHeaderCell>
              <Table.Cell>
                <Code>{task.complexity}</Code>
              </Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>
                <Checkbox checked={task.completed} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
