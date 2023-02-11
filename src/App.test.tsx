import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('Testing app component', () => {
  it('should have hello world text', () => {
    render(<App />);
    const message = screen.queryByText(/Hello world/i);

    expect(message).toBeDefined();
  });
});

export {};
