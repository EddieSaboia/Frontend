import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Tasks from '../pages/Tasks'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const TasksWithRouter = () => (
  <BrowserRouter>
    <Tasks />
  </BrowserRouter>
)

describe('Tasks Component - Delete Modal', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTasks))
  })

  it('should show confirmation modal when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<TasksWithRouter />)
    
    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })
    
    // Click delete button for first task
    const deleteButtons = screen.getAllByText('Remover')
    await user.click(deleteButtons[0])
    
    // Check if modal appears
    expect(screen.getByText('Excluir Task')).toBeInTheDocument()
    expect(screen.getByText(/Tem certeza que deseja excluir a task "Task 1"/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('should close modal when cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(<TasksWithRouter />)
    
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })
    
    // Open modal
    const deleteButtons = screen.getAllByText('Remover')
    await user.click(deleteButtons[0])
    
    // Cancel deletion
    const cancelButton = screen.getByRole('button', { name: /cancelar/i })
    await user.click(cancelButton)
    
    // Modal should be closed
    expect(screen.queryByText('Excluir Task')).not.toBeInTheDocument()
  })

  it('should delete task when confirm button is clicked', async () => {
    const user = userEvent.setup()
    render(<TasksWithRouter />)
    
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })
    
    // Open modal
    const deleteButtons = screen.getAllByText('Remover')
    await user.click(deleteButtons[0])
    
    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /excluir/i })
    await user.click(confirmButton)
    
    // Check if localStorage.setItem was called with updated tasks
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([mockTasks[1]]) // Only second task should remain
    )
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByText('Excluir Task')).not.toBeInTheDocument()
    })
  })

  it('should show correct task title in confirmation message', async () => {
    const user = userEvent.setup()
    render(<TasksWithRouter />)
    
    await waitFor(() => {
      expect(screen.getByText('Task 2')).toBeInTheDocument()
    })
    
    // Click delete button for second task
    const deleteButtons = screen.getAllByText('Remover')
    await user.click(deleteButtons[1])
    
    // Check if correct task title appears in modal
    expect(screen.getByText(/Tem certeza que deseja excluir a task "Task 2"/)).toBeInTheDocument()
  })

  it('should not show modal initially', () => {
    render(<TasksWithRouter />)
    
    expect(screen.queryByText('Excluir Task')).not.toBeInTheDocument()
  })

  it('should handle empty task list', async () => {
    mockLocalStorage.getItem.mockReturnValue('[]')
    render(<TasksWithRouter />)
    
    // No tasks should be displayed
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Remover')).not.toBeInTheDocument()
  })
})