import { PageHeading } from '~/styles/shared';

import { styled } from '@linaria/react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function Heading({
  title,
  customBackPathname,
  noBackButton,
  style,
  children,
  ...props
}: React.PropsWithChildren<{
  title?: string;
  customBackPathname?: string;
  noBackButton?: boolean;
  style?: React.CSSProperties;
}>) {
  return (
    <PageHeading style={{ position: 'relative', ...style }} {...props}>
      {!noBackButton && (
        <StyledBackButton>
          <Link href={customBackPathname ?? './'}>
            <FiArrowLeft />
          </Link>
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
    color: var(--secondary-color);
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    svg {
      color: var(--main-color);
    }
  }
`;
