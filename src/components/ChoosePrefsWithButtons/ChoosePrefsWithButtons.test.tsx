import { render, screen } from '@test-utils';
import { ChoosePrefsWithButtons } from './ChoosePrefsWithButtons';

describe('ChoosePrefsWithButtons component', () => {
  it('has correct Vite guide link', () => {
    render(<ChoosePrefsWithButtons />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
