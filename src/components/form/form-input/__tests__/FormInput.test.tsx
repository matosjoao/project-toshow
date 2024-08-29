import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormInput from '../FormInput';

describe('FormInput Component', () => {

    it('renders the input with the correct label', () => {
        render(<FormInput label="Test Label" id="test-input" />);
        const labelElement = screen.getByText('Test Label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute('for', 'test-input');
    });

    it('handles changes in the input value', () => {
        render(<FormInput label="Test Label" id="test-input" />);
        const inputElement = screen.getByLabelText('Test Label');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        expect(inputElement).toHaveValue('New Value');
    });
    
    it('applies the default value correctly', () => {
        render(<FormInput label="Test Label" id="test-input" defaultValue='Default Value'/>);
        const inputElement = screen.getByLabelText('Test Label');
        expect(inputElement).toHaveValue('Default Value');
    });

    it('updates input value when defaultValue changes', () => {
        const { rerender } = render(<FormInput label="Test Label" id="test-input" defaultValue="Initial Value" />);
        const inputElement = screen.getByLabelText('Test Label');
        expect(inputElement).toHaveValue('Initial Value');
        rerender(<FormInput label="Test Label" id="test-input" defaultValue="Updated Value" />);
        expect(inputElement).toHaveValue('Updated Value');
    });

    it('applies additional inputProps correctly', () => {
        render(<FormInput label="Test Label" id="test-input" inputProps={{ placeholder: 'Enter text here' }} />);
        const inputElement = screen.getByLabelText('Test Label');
        expect(inputElement).toHaveAttribute('placeholder', 'Enter text here');
    });

    it('applies custom container class names', () => {
        const customClass = 'custom-class';
        const { container } = render(<FormInput label="Test Label" id="test-input" containerClassesNames={customClass} />);
        const divElement = container.querySelector('div');
        expect(divElement).toHaveClass(customClass);
    });
});