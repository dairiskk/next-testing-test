import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from "@/app/page";

describe('LoginPage Static UI', () => {
    beforeEach(() => {
        render(<LoginPage />);
    });

    it('renders email and password inputs', () => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders correct placeholders in inputs', () => {
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');
        expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
    });

    it('renders an enabled Log In button', () => {
        const submitButton = screen.getByRole('button', { name: /log in/i });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    // it('renders heading and description', () => {
    //     expect(screen.getByText(/log in/i, { selector: 'h2, h1, .card-title' })).toBeInTheDocument();
    //     expect(screen.getByText(/enter your credentials to access your account\./i)).toBeInTheDocument();
    // });

    it('renders sign-up link pointing to /register', () => {
        const signUpLink = screen.getByRole('link', { name: /sign up/i });
        expect(signUpLink).toHaveAttribute('href', '/register');
    });
});

// describe('LoginPage Snapshot', () => {
//     it('matches the snapshot', () => {
//         const { asFragment } = render(<LoginPage />);
//         expect(asFragment()).toMatchSnapshot();
//     });
// });