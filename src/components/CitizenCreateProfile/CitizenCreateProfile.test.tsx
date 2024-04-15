import { render, screen } from '@test-utils';
import { CitizenCreateProfile } from './CitizenCreateProfile';

describe('CitizenCreateProfile component', () => {
  it('has correct Vite guide link', () => {
    render(<CitizenCreateProfile />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
