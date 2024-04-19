import { render, screen } from '@test-utils';
import { EmailPartlyHidden } from './EmailPartlyHidden';

describe('EmailPartlyHidden component', () => {
  it('has correct Vite guide link', () => {
    render(<EmailPartlyHidden email="test@EmailPartlyHidden.com" />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
