import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('renders correctly with current page and total pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    // Verify the buttons and page info are rendered
    expect(screen.getByText(/1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  test('disables the "Previous" button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText(/Previous/i);

    // Verify the "Previous" button is disabled
    expect(prevButton).toBeDisabled();
  });

  test('disables the "Next" button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText(/Next/i);

    // Verify the "Next" button is disabled
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange with the correct page when "Previous" button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText(/Previous/i);
    fireEvent.click(prevButton);

    // Verify onPageChange is called with the previous page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with the correct page when "Next" button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Verify onPageChange is called with the next page number
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('does not call onPageChange if "Previous" button is clicked on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText(/Previous/i);
    fireEvent.click(prevButton);

    // Verify onPageChange is not called
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test('does not call onPageChange if "Next" button is clicked on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Verify onPageChange is not called
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
