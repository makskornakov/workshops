import { css } from '@linaria/core';

import { media } from '../utils/media-queries';
import { reset } from '../utils/styleUtils';

export const globals = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100;400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap'); */
    :root {
      --border-radius-small: 0.25rem;
      --border-radius-medium: 0.5rem;

      --background-color: #e9e9e9;
      --main-color: #111;
      --secondary-color: #666;
      --tertiary-color: #999;

      --border-color: #999;

      ${media.prefersColorSchemeDark} {
        --background-color: #111111;
        --main-color: #efefef;
        --secondary-color: #b1b1b1;
        --tertiary-color: #5d5d5d;

        --border-color: #333;
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
      overflow-x: hidden;
    }

    body {
      color: var(--main-color);
      background: var(--background-color);
    }

    a {
      ${reset.a}
    }
  }
`;
