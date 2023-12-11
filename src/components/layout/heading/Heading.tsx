import { PageHeading } from '~/styles/shared';

import BackLink from './BackLink';
import { styled } from '@linaria/react';

export default function Heading({
  title,
  customBackPathname,
  style,
  children,
  ...props
}: React.PropsWithChildren<{
  title?: string;
  customBackPathname?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <PageHeading style={{ position: 'relative', ...style }} {...props}>
      <StyledBackButton>
        <BackLink customPathname={customBackPathname} />
      </StyledBackButton>
      {title}
      {children}
    </PageHeading>
  );
}

const StyledBackButton = styled.div`
  /* outline: 1px solid yellow; */

  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 3rem;
  top: calc(50% - 1rem);
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    color: var(--secondary-color);
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    svg {
      color: var(--main-color);
    }
  }
`;
