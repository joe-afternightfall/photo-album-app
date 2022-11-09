import { render, screen } from '@testing-library/react';
import React from 'react';

import AppLoader from './AppLoader';

describe('App Loader Component', () => {
  it('should render', () => {
    render(<AppLoader />);

    expect(screen.getByTestId('circular-app-loader')).toBeInTheDocument();
  });
});
