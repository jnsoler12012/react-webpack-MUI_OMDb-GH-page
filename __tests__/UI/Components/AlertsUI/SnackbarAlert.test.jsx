import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SnackbarAlert } from '../../../../src/UI/Components/AlertsUI';


describe('SnackbarAlert Component', () => {
    const setMainContext = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders success Snackbar with correct message', () => {
        const statusResponse = { code: 200, message: 'Success!' };

        render(<SnackbarAlert statusResponse={statusResponse} setMainContext={setMainContext} />);

        expect(screen.getByRole('alert')).toHaveTextContent('Success!');
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess');
    });

    test('renders error Snackbar with correct message', () => {
        const statusResponse = { code: 400, message: 'Error occurred!' };

        render(<SnackbarAlert statusResponse={statusResponse} setMainContext={setMainContext} />);

        expect(screen.getByRole('alert')).toHaveTextContent('Error occurred!');
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledError');
    });

    test('handles close button click', () => {
        const statusResponse = { code: 200, message: 'Success!' };

        render(<SnackbarAlert statusResponse={statusResponse} setMainContext={setMainContext} />);

        const closeButton = screen.getByLabelText('close');
        fireEvent.click(closeButton);

        expect(setMainContext).toHaveBeenCalledWith(expect.any(Function));
    });
});
