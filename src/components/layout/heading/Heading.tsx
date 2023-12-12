import { PageHeading } from '~/styles/shared';

import { styled } from '@linaria/react';
import BackButton from './BackButton';
import { colorVar } from '~/utils/colors';
// import Link from 'next/link';
// import { FiArrowLeft } from 'react-icons/fi';

export default function Heading({
  title,
  // customBackPathname,
  noBackButton,
  requireConfirmation,
  style,
  children,
  ...props
}: React.PropsWithChildren<{
  title?: string;
  // customBackPathname?: string;
  noBackButton?: boolean;
  requireConfirmation?: boolean;
  style?: React.CSSProperties;
}>) {
  return (
    <PageHeading style={{ position: 'relative', ...style }} {...props}>
      {!noBackButton && (
        <StyledBackButton>
          <BackButton requireConfirmation={requireConfirmation} />
        </StyledBackButton>
      )}
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
    color: ${colorVar('secondary-color')};
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    svg {
      color: ${colorVar('main-color')};
    }
  }
`;
