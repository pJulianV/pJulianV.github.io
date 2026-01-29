import { describe, it, expect } from 'vitest';

describe('Sample Frontend Test', () => {
  it('should render the page', () => {
    document.body.innerHTML = '<div id="app">Hello World</div>';
    const app = document.getElementById('app');
    expect(app).not.toBeNull();
    expect(app.textContent).toBe('Hello World');
  });
});
