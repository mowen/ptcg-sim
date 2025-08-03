import type { Preview } from '@storybook/react-vite';

import '../src/css/index.css';
import '../src/App.css';
import '../src/react/components/board/board.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
