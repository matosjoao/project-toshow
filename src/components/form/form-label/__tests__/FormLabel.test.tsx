import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormLabel from '../FormLabel';

describe('FormLabel Component', () => {
    it('renders the label with the correct text', () => {
        render(<FormLabel label='Test Label'><div>Child Element</div></FormLabel>);
        const labelElement = screen.getByText('Test Label');
        expect(labelElement).toBeInTheDocument();
    });

    it('renders the label with children', () => {
        render(<FormLabel label='Test Label'><div>Child Element</div></FormLabel>);
        const childElement = screen.getByText('Child Element');
        expect(childElement).toBeInTheDocument();
    });

    it('applies custom container class names', () => {
        const customClass = 'custom-class';
        const { container } = render(<FormLabel label="Test Label" containerClassesNames={customClass}>Test Label Children</FormLabel>);
        const divElement = container.querySelector('div');
        expect(divElement).toHaveClass(customClass);
    });
});