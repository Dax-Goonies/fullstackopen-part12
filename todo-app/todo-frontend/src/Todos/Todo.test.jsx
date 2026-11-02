import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import Todo from './Todo'

describe('<Todo />', () => {
  const todo = { _id: '1', text: 'Learn testing', done: false }

  // TEST: Display the correct todo
  test('renders the todo text', () => {
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('Learn testing')).toBeInTheDocument()
  })

  // TEST: Display correct status and button options
  test('shows "not done" status and both buttons when not done', () => {
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  // TEST: Done status and correct button option
  test('shows "done" status and only delete button when done', () => {
    const doneTodo = { ...todo, done: true }
    render(<Todo todo={doneTodo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })

  // TEST: Remove todo
  test('clicking Delete calls deleteTodo with the todo', async () => {
    const deleteTodo = vi.fn()
    const user = userEvent.setup()
    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={() => {}} />)

    await user.click(screen.getByText('Delete'))

    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  // TEST: Complete status for a todo
  test('clicking Set as done calls completeTodo with the todo', async () => {
    const completeTodo = vi.fn()
    const user = userEvent.setup()
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={completeTodo} />)

    await user.click(screen.getByText('Set as done'))

    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})