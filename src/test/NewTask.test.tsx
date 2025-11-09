import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewTask from '../pages/NewTask'

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

describe('NewTask Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue('[]')
  })

  it('should render all form elements', () => {
    render(<NewTask />)
    
    expect(screen.getByRole('heading', { name: /new tasks/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/task/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should show error when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Preencha todos os campos.')).toBeInTheDocument()
  })

  it('should show error when title is empty', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(descriptionInput, 'Test description')
    await user.click(submitButton)
    
    expect(screen.getByText('Preencha todos os campos.')).toBeInTheDocument()
  })

  it('should show error when description is empty', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(titleInput, 'Test task')
    await user.click(submitButton)
    
    expect(screen.getByText('Preencha todos os campos.')).toBeInTheDocument()
  })

  it('should create a new task successfully', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(titleInput, 'New Task Title')
    await user.type(descriptionInput, 'New Task Description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Task adicionada com sucesso!')).toBeInTheDocument()
    })
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      expect.stringContaining('New Task Title')
    )
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      expect.stringContaining('New Task Description')
    )
  })

  it('should clear form after successful submission', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i) as HTMLInputElement
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(titleInput, 'Test Task')
    await user.type(descriptionInput, 'Test Description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(titleInput.value).toBe('')
      expect(descriptionInput.value).toBe('')
    })
  })

  it('should add task to existing tasks in localStorage', async () => {
    const existingTasks = [
      { id: 1, title: 'Existing Task', description: 'Existing Description' }
    ]
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingTasks))
    
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(titleInput, 'Second Task')
    await user.type(descriptionInput, 'Second Description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'tasks',
        expect.stringContaining('Second Task')
      )
    })
    
    const setItemCall = mockLocalStorage.setItem.mock.calls[0][1]
    const savedTasks = JSON.parse(setItemCall)
    expect(savedTasks).toHaveLength(2)
    expect(savedTasks[1]).toMatchObject({
      title: 'Second Task',
      description: 'Second Description'
    })
  })

  it('should handle localStorage errors gracefully', async () => {
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })
    
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(titleInput, 'Test Task')
    await user.type(descriptionInput, 'Test Description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar task.')).toBeInTheDocument()
    })
  })

  it('should generate unique IDs for tasks', async () => {
    const user = userEvent.setup()
    render(<NewTask />)
    
    const titleInput = screen.getByLabelText(/task/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    // Create task
    await user.type(titleInput, 'Test Task')
    await user.type(descriptionInput, 'Test Description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })
    
    // Verify that task has an ID (timestamp)
    const savedTasksString = mockLocalStorage.setItem.mock.calls[0][1]
    const savedTasks = JSON.parse(savedTasksString)
    
    expect(savedTasks).toHaveLength(1)
    expect(savedTasks[0]).toHaveProperty('id')
    expect(typeof savedTasks[0].id).toBe('number')
    expect(savedTasks[0].id).toBeGreaterThan(0)
    expect(savedTasks[0].title).toBe('Test Task')
    expect(savedTasks[0].description).toBe('Test Description')
  })
})