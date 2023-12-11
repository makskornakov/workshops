import { PageHeading } from '~/styles/shared';
import prisma from '../../../../../lib/prisma';
import Link from 'next/link';
import { getUser } from '~/utils/prismaUser';
import { StyledLink } from '~/styles/shared';

import Image from 'next/image';

import DeleteForm from './components/DeleteForm';
import { IoTimeOutline } from 'react-icons/io5';
import { IoBarChartOutline } from 'react-icons/io5';
import { styled } from '@linaria/react';
import { complexityValues, timeConsumptionValues } from '~/configs/config';

export default async function MaterialPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const user = await getUser();
  const materialId = params.id;
  const material = await prisma.material.findUnique({
    where: {
      id: materialId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log(material);
  if (!material) {
    return <h2>Material not found</h2>;
  }

  return (
    <>
      <PageHeading
        style={
          {
            // gap: '.4rem',
            // flexDirection: 'column',
            // alignItems: 'flex-start',
            // paddingBottom: '0.6rem',
          }
        }
      >
        {material.title}
      </PageHeading>

      <MaterialPreview style={{ minHeight: material.mediaUrl ? '50vh' : 'auto' }}>
        <div>
          <h3>
            {material.author.name} - {new Date(material.createdAt).toLocaleDateString()}
          </h3>
          {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}> */}
          <h3>
            Category:{' '}
            <Link href={`/materials/${material.categorySlug}`}>{material.category.name}</Link>
          </h3>
          <TimeAndComplexity>
            <h3>
              <IoTimeOutline />{' '}
              <span
                style={{
                  color: `hsl(${(5 - material.timeConsumption) * 25}, 85%, 50%)`,
                }}
              >
                {timeConsumptionValues[material.timeConsumption - 1]}
              </span>
            </h3>
            <h3>
              <IoBarChartOutline />{' '}
              <span
                style={{
                  color: `hsl(${(5 - material.complexity) * 25}, 85%, 50%)`,
                }}
              >
                {complexityValues[material.complexity - 1]}
              </span>
            </h3>
          </TimeAndComplexity>

          {material.description && (
            <>
              <p>{material.description}</p>
              <hr
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#333333',
                  border: 'none',
                }}
              />
            </>
          )}
          {material.paragraph && (
            <p
              style={{
                whiteSpace: 'pre-line',
              }}
            >
              {material.paragraph}
            </p>
          )}
        </div>
        <div>
          {material.mediaUrl && (
            <ImageContainer>
              <Image
                src={material.mediaUrl}
                alt={material.title}
                fill
                // stick to right
                // style={{ alignSelf: 'flex-end' }}
              />
            </ImageContainer>
          )}
        </div>
        <div>
          {/* if user is the author display the edit button */}
          {material && user?.id === material.authorId && (
            <>
              <StyledLink href={`/materials/${material.categorySlug}/${material.id}/edit`}>
                Edit Material
              </StyledLink>

              <DeleteForm material={material} />
            </>
          )}
        </div>
      </MaterialPreview>
    </>
  );
}

const TimeAndComplexity = styled.div`
  /* outline: 1px solid red; */
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;

  & > h3 {
    /* outline: 1px solid blue; */

    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 300;

    & > svg {
      height: 1.25rem;
      width: 1.25rem;
      color: var(--secondary-color);
    }
  }

  /* h3 first child */
  & > h3:first-child {
    /* outline: 1px solid green; */

    border-right: 1px solid var(--tertiary-color);
    padding-right: 2rem;
  }
`;

const MaterialPreview = styled.div`
  /* outline: 1px solid red; */

  width: 80%;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-bottom: 3rem;

  & > div {
    /* outline: 1px solid green; */

    width: 47%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    h3 {
      font-size: 1rem;
      font-weight: 300;
      color: #a6a6a6;
      margin: 0;
    }

    a {
      transition-duration: 0.2s;
      transition-property: color;
      text-decoration: underline;
      font-weight: 300;
      color: #d6d6d6;
      &:hover {
        color: #fff;
      }
    }

    p {
      font-size: 0.95rem;
      font-weight: 300;
      color: #f2f2f2;
    }
  }

  /* footer for last child */
  & > div:last-child {
    /* outline: 1px solid blue; */

    position: absolute;
    bottom: 0;
    height: 3rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  /* outline: 1px solid red; */
  width: 100%;
  height: 90%;
  /* margin: auto; */
  position: relative;

  & > img {
    object-fit: contain;
    object-position: right;
  }
`;
