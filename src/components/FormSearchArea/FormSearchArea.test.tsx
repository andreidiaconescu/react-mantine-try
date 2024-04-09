import { render, screen } from '@test-utils';
import { FormSearchArea } from './FormSearchArea';

describe('FormSearchArea component', () => {
  it('has correct Vite guide link', () => {
    render(<FormSearchArea />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
