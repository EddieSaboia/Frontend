import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmationModal from '../components/ConfirmationModal'

describe('ConfirmationModal Component', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    message: 'Test message',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  }

  it('should render modal when isOpen is true', () => {
    render(<ConfirmationModal {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('should not render modal when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('should call onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    
    render(<ConfirmationModal {...defaultProps} onConfirm={onConfirm} />)
    
    const confirmButton = screen.getByRole('button', { name: /confirmar/i })
    await user.click(confirmButton)
    
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    
    render(<ConfirmationModal {...defaultProps} onCancel={onCancel} />)
    
    const cancelButton = screen.getByRole('button', { name: /cancelar/i })
    await user.click(cancelButton)
    
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('should render custom button texts', () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        confirmButtonText="Delete"
        cancelButtonText="Keep"
      />
    )
    
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /keep/i })).toBeInTheDocument()
  })

  it('should have proper styling and classes', () => {
    render(<ConfirmationModal {...defaultProps} />)
    
    // Check for backdrop
    const backdrop = screen.getByText('Test Title').closest('[class*="fixed"]')
    expect(backdrop).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-50')
    
    // Check for modal content
    const modal = screen.getByText('Test Title').closest('[class*="bg-white"]')
    expect(modal).toHaveClass('bg-white', 'rounded-lg')
  })
})