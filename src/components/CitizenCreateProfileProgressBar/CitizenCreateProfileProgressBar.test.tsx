import { render, screen } from '@test-utils';
import { CitizenCreateProfileProgressBar } from './CitizenCreateProfileProgressBar';

describe('CitizenCreateProfileProgressBar component', () => {
  it('has correct Vite guide link', () => {
    render(<CitizenCreateProfileProgressBar />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
