import { css } from '@linaria/core';

import { media } from '../utils/media-queries';
import { reset } from '../utils/reset';

export const globals = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100;400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap'); */
    :root {
      --max-width: 1100px;
      --border-radius: 12px;
      --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono',
        'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono',
        'Courier New', monospace;

      --background-color: #fff;
      --secondary-glow: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

      --tile-start-rgb: 239, 245, 249;
      --tile-end-rgb: 228, 232, 233;
      --tile-border: conic-gradient(
        #00000080,
        #00000040,
        #00000030,
        #00000020,
        #00000010,
        #00000010,
        #00000080
      );

      --callout-rgb: 238, 240, 241;
      --callout-border-rgb: 172, 175, 176;
      --card-rgb: 180, 185, 188;
      --card-border-rgb: 131, 134, 135;

      ${media.prefersColorSchemeDark} {
        --background-color: #111111;
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
      color: #fff;
      background: var(--background-color);
    }

    a {
      ${reset.a}
    }

    /* spin animation */
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    /* applied to container */
    .custom-class {
      /* display: none; */
      background: none;
    }

    /* applied to button */
    .custom-class > *[data-ut-element='button'] {
      font-size: 1.6rem;
      color: rgb(0 0 0 / 1);
      background-color: transparent;
    }

    /* applied to button when uploading */
    .custom-class > *[data-ut-element='button'][data-state='readying'] {
      /* background-color: rgb(239 68 68 / 0.5); */
      color: rgb(0 0 0 / 0.5);
      cursor: not-allowed;
    }

    /* applied to button when uploading */
    .custom-class > *[data-ut-element='button'][data-state='uploading'] {
      /* background-color: rgb(239 68 68 / 0.5); */
      color: rgb(0 0 0 / 0.5);
      cursor: not-allowed;

      > svg {
        color: #fff;
        width: 4rem;
        height: 4rem;
        animation: spin 1s linear infinite;

        /* shadow for it to be visible */
        filter: drop-shadow(0 0 0.5rem #000);
      }
    }

    /* applied to upload indicator when uploading */
    .custom-class > *[data-ut-element='button'][data-state='uploading']::after {
      content: none !important;
    }

    /* ${media.prefersColorSchemeDark} {
      html {
        color-scheme: dark;
      }
    } */
  }
`;
