import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormSingleAccordion from '../FormSingleAccordion';

describe('FormSingleAccordion Component', () => {

    it('renders the title and icon correctly', () => {
        const mockIcon = <svg data-testid="mock-icon" />;
        render(
            <FormSingleAccordion icon={mockIcon} title="Accordion Title">
                <div>Accordion Content</div>
            </FormSingleAccordion>
        );
        const titleElement = screen.getByText('Accordion Title');
        const iconElement = screen.getByTestId('mock-icon');
        
        expect(titleElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
    });

    it('toggles the accordion content when the button is clicked', () => {
        render(
            <FormSingleAccordion icon={<svg />} title="Accordion Title">
                <div data-testid="accordion-content">Accordion Content</div>
            </FormSingleAccordion>
        );
        
        const buttonElement = screen.getByRole('button');
        const contentElement = screen.queryByTestId('accordion-content');

        // Initially, the content should be hidden
        expect(contentElement).not.toBeInTheDocument();

        // Click to open
        fireEvent.click(buttonElement);
        expect(screen.getByTestId('accordion-content')).toBeInTheDocument();

        // Click to close
        fireEvent.click(buttonElement);
        expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
    });

    it('sets the initial open state based on the initialOpen prop', () => {
        render(
            <FormSingleAccordion icon={<svg />} title="Accordion Title" initialOpen>
                <div data-testid="accordion-content">Accordion Content</div>
            </FormSingleAccordion>
        );

        const contentElement = screen.getByTestId('accordion-content');
        
        // The content should be visible initially because initialOpen is true
        expect(contentElement).toBeInTheDocument();
    });

});