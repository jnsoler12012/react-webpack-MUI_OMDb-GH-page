import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AsideBar } from '../../../../src/UI/Components/Bars';

describe('DrawerComponent', () => {
    const execFilterSearch = jest.fn();
    const setMainContext = jest.fn();
    const movieList = [
        { Year: '2020', Director: 'Director A' },
        { Year: '2020', Director: 'Director B' },
        { Year: '2021', Director: 'Director A' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders DrawerComponent correctly', () => {
        render(<AsideBar execFilterSearch={execFilterSearch} movieList={movieList}>Children Content</AsideBar>);

        // Check if the children content is rendered
        expect(screen.getByText('Children Content')).toBeInTheDocument();

        // Check if the movie year counter and director counter are rendered
        expect(screen.getByText('Movie Year counter')).toBeInTheDocument();
        expect(screen.getByText('2020 - 2')).toBeInTheDocument();
        expect(screen.getByText('2021 - 1')).toBeInTheDocument();
        expect(screen.getByText('Director counter')).toBeInTheDocument();
        expect(screen.getByText('Director A - 2')).toBeInTheDocument();
        expect(screen.getByText('Director B - 1')).toBeInTheDocument();
    });

    test('handles drawer toggling', () => {
        render(<AsideBar execFilterSearch={execFilterSearch} movieList={movieList}>Children Content</AsideBar>);

        // Check if the drawer toggle button works
        const toggleButton = screen.getByLabelText('open drawer');
        fireEvent.click(toggleButton);
        // Check if the drawer opened
        expect(screen.getByText('Movie Year counter')).toBeInTheDocument();
    });

    test('executes execFilterSearch on button click', () => {
        render(<AsideBar execFilterSearch={execFilterSearch} movieList={movieList}>Children Content</AsideBar>);

        // Find the input field and button
        const inputField = screen.getByLabelText('With');
        const button = screen.getByText('Contained');

        // Simulate user typing into the input field
        fireEvent.change(inputField, { target: { value: 'search query' } });
        fireEvent.click(button);

        // Check if execFilterSearch was called with the correct argument
        expect(execFilterSearch).toHaveBeenCalledWith({ searchName: 'search query' });
    });
});