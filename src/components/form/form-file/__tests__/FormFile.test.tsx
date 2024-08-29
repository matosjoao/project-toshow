import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormFile from '../FormFile';

describe('FormFile Component', () => {

    it('renders the label with the correct text', () => {
        render(<FormFile label="Upload Image" id="file-upload" />);
        const labelElement = screen.getByText('Upload Image');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute('for', 'file-upload');
    });

    it('handles image upload with valid file types', async () => {
        const { container } = render(<FormFile label="Upload Image" id="file-upload" />);
        const inputElement = screen.getByLabelText('Upload Image');
        
        // Create a mock file with valid type
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        // Trigger the file upload
        fireEvent.change(inputElement, { target: { files: [file] } });
        
        // Wait for the image to be rendered
        await waitFor(() => {
            const imgElement = container.querySelector('img');
            expect(imgElement).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    it('handles image upload with invalid file types', () => {
        render(<FormFile label="Upload Image" id="file-upload" />);
        const inputElement = screen.getByLabelText('Upload Image');
        
        // Create a mock file with invalid type
        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

        // Trigger the file upload
        fireEvent.change(inputElement, { target: { files: [file] } });

        // Verify that the error message is displayed
        const errorMessage = screen.getByText('Por favor seleccione uma imagem válida (png, jpeg, jpg).');
        expect(errorMessage).toBeInTheDocument();

        // Verify that the image preview is not displayed
        const imgElement = screen.queryByRole('img');
        expect(imgElement).not.toBeInTheDocument();
    });

    it('displays the default image when defaultValue is provided and no image is uploaded', () => {
        const defaultImage = 'default-image-url.png';
        const { container } = render(<FormFile label="Upload Image" id="file-upload" defaultValue={defaultImage} />);
        
        // Verify that the default image is displayed
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', defaultImage);
    });

    it('handles required input field', () => {
        render(<FormFile label="Upload Image" id="file-upload" required />);
        const inputElement = screen.getByLabelText('Upload Image');
        expect(inputElement).toBeRequired();
    });

});