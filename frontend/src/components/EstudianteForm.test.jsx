import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EstudianteForm from './EstudianteForm';

describe('EstudianteForm', () => {
  it('renders the form correctly', () => {
    render(<EstudianteForm onRegistro={() => {}} />);

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/documento de identidad/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /comenzar/i })).toBeInTheDocument();
  });

  it('disables the button when fields are empty', () => {
    render(<EstudianteForm onRegistro={() => {}} />);
    expect(screen.getByRole('button', { name: /comenzar/i })).toBeDisabled();
  });

  it('enables the button when fields are filled', () => {
    render(<EstudianteForm onRegistro={() => {}} />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/documento de identidad/i), { target: { value: '12345' } });

    expect(screen.getByRole('button', { name: /comenzar/i })).toBeEnabled();
  });
});
