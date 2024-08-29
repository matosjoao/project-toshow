import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormBadge from '../FormBadge';

describe('FormBadge Component', () => {
    it('renders the badge with the correct letter', () => {
        render(<FormBadge letter="a" />);
        const badgeElement = screen.getByText('A'); // Should be uppercase
        expect(badgeElement).toBeInTheDocument();
    });

    it('renders the badge with custom classes', () => {
        const customClasses = 'bg-red-500 border-2 border-black';
        render(<FormBadge letter="b" classes={customClasses} />);
        const badgeElement = screen.getByText('B');
        expect(badgeElement).toHaveClass('bg-red-500 border-2 border-black');
    });

    it('converts the letter to uppercase', () => {
        render(<FormBadge letter="c" />);
        const badgeElement = screen.getByText('C');
        expect(badgeElement.textContent).toBe('C');
    });

    it('applies default classes correctly', () => {
        render(<FormBadge letter="d" />);
        const badgeElement = screen.getByText('D');
        expect(badgeElement).toHaveClass('flex flex-none items-center justify-center w-12 h-12 rounded-full bg-gray-500 text-white text-center font-bold text-2xl');
    });
});