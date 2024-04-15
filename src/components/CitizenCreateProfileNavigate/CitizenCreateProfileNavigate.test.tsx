import { render, screen } from '@test-utils';
import { CitizenCreateProfileNavigate } from './CitizenCreateProfileNavigate';

describe('CitizenCreateProfileNavigate component', () => {
  it('has correct Vite guide link', () => {
    render(<CitizenCreateProfileNavigate />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
