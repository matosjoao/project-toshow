import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormButton from '../FormButton';
import { ButtonStyle } from '../types';

describe('FormButton Component', () => {
    it('renders the button with default props', () => {
        render(<FormButton>Click Me</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-blue-700 hover:bg-blue-800 text-white');
        expect(buttonElement).toHaveAttribute('type', 'button');
        expect(buttonElement).not.toBeDisabled();
    });

    it('renders the button with SUCCESS style', () => {
        render(<FormButton style={ButtonStyle.SUCCESS}>Success</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /success/i });
        expect(buttonElement).toHaveClass('bg-green-600 hover:bg-green-700 text-white');
    });

    it('renders the button with BACK style', () => {
        render(<FormButton style={ButtonStyle.BACK}>Back</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /back/i });
        expect(buttonElement).toHaveClass('bg-gray-300 hover:bg-gray-400 text-black');
    });

    it('calls onClick handler when clicked', () => {
        const onClickMock = vi.fn();
        render(<FormButton onClick={onClickMock}>Click Me</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick handler if buttonType is submit', () => {
        const onClickMock = vi.fn();
        render(<FormButton buttonType="submit" onClick={onClickMock}>Submit</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(buttonElement);
        expect(onClickMock).not.toHaveBeenCalled();
    });

    it('renders the button as disabled', () => {
        render(<FormButton isDisabled>Disabled</FormButton>);
        const buttonElement = screen.getByRole('button', { name: /disabled/i });
        expect(buttonElement).toBeDisabled();
    });
});