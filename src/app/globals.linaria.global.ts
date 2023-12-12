import { css } from '@linaria/core';
import { colorVar, injectColorsIntoStyles } from '../utils/colors';

import { media } from '../utils/media-queries';
import { reset } from '../utils/styleUtils';

export const globals = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100;400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap'); */
    :root {
      /* create root vars from colors */

      --border-radius-small: 0.25rem;
      --border-radius-medium: 0.5rem;

      /* --background-color: #e9e9e9;
      --main-color: #111;
      --secondary-color: #666;
      --tertiary-color: #999;

      --border-color: #999;  */

      ${injectColorsIntoStyles('light')}

      ${media.prefersColorSchemeDark} {
        /* --background-color: #111111;
        --main-color: #efefef;
        --secondary-color: #b1b1b1;
        --tertiary-color: #5d5d5d;

        --border-color: #333; */

        ${injectColorsIntoStyles('dark')}
      }
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html,
    body {
      max-width: 100vw;
      min-height: 100vh;
      overflow-x: hidden;
    }

    body {
      color: ${colorVar('main-color')};
      background: ${colorVar('background-color')};
    }

    a {
      ${reset.a}
    }
  }
`;
