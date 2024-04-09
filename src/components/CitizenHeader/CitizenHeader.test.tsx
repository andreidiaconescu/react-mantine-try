import { render, screen } from '@test-utils';
import { CitizenHeader } from './CitizenHeader';

describe('CitizenHeader component', () => {
  it('has correct Vite guide link', () => {
    render(<CitizenHeader />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
