import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormContainer from '../FormContainer';

describe('FormContainer Component', () => {

    it('renders the form with children', () => {
        render(
            <FormContainer>
                <div>Child Element</div>
            </FormContainer>
        );
        const childElement = screen.getByText('Child Element');
        expect(childElement).toBeInTheDocument();
    });

    it('calls onSubmitForm handler when form is submitted', () => {
        const onSubmitMock = vi.fn();
        render(
            <FormContainer onSubmitForm={onSubmitMock}>
                <button type="submit">Submit</button>
            </FormContainer>
        );
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.submit(submitButton);
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('applies additional formProps correctly', () => {
        render(
            <FormContainer formProps={{ 'data-testid': 'custom-form', className: 'custom-class' }}>
                <div>Test</div>
            </FormContainer>
        );
        const formElement = screen.getByTestId('custom-form');
        expect(formElement).toHaveClass('custom-class');
    });

});