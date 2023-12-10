'use client';
import { styled } from '@linaria/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

export default function ServerSelectComp({
  selectedCategory,
  categories,
}: {
  selectedCategory: { name: string; slug: string };
  categories: { name: string; slug: string }[];
}) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);
  const selectRef = useRef<HTMLLabelElement>(null);
  const router = useRouter();

  const completeCategories = [{ name: 'All', slug: 'all' }, ...categories];

  useEventListener(
    'click',
    (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setSelectOpen(false);
      }
    },
    undefined,
    true,
  );

  // arrow up
  useEventListener(
    'keydown',
    (event) => {
      if (!selectOpen) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const index = completeCategories.findIndex(
          (category) => category.name === currentCategory.name,
        );

        if (event.key === 'ArrowDown') {
          const newIndex = index < completeCategories.length - 1 ? index + 1 : 0;
          setCurrentCategory(completeCategories[newIndex]);
          return;
        }
        if (event.key === 'ArrowUp') {
          const newIndex = index > 0 ? index - 1 : completeCategories.length - 1;
          setCurrentCategory(completeCategories[newIndex]);
        }
        return;
      }
      if (event.key === 'Enter') {
        if (currentCategory.slug === selectedCategory.slug) return;
        router.push(`/materials/${currentCategory.slug}`);
        return;
      }
      if (event.key === 'Escape') {
        setSelectOpen(false);
      }
    },
    undefined,
    true,
  );

  return (
    <CategoryWrapper>
      <SelectContainer
        onClick={() => setSelectOpen(!selectOpen)}
        ref={selectRef}
        data-open={selectOpen}
      >
        {selectedCategory.name}
        <span></span>
        <SelectLinksContainer style={{ display: selectOpen ? 'flex' : 'none' }}>
          {/* <Link href={`/materials/${'all'}`}>All</Link> */}
          {completeCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/materials/${category.slug}`}
              style={category.name === currentCategory.name ? { color: '#fff' } : {}}
            >
              {category.name}
            </Link>
          ))}
        </SelectLinksContainer>
      </SelectContainer>
    </CategoryWrapper>
  );
}
const CategoryWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  flex-direction: row;
`;

const SelectContainer = styled.label<{ 'data-open': boolean }>`
  border: 1px solid #b1b1b1;
  border-radius: 0.25rem;
  /* padding left .5rem tob and bottm .5rem, right 2.5rem */
  padding: 0.4rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  color: #b1b1b1;
  position: relative;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: color, border-color;

  display: flex;
  gap: 0.5rem;
  align-items: center;

  & > span {
    border: solid #b1b1b1;
    border-width: 0 1.5px 1.5px 0;
    padding: 0.3rem;
    margin-top: 0.15rem;

    transform: rotate(45deg) translateY(-50%);
    transition-duration: 0.2s;
    transition-property: border-color;
  }

  &:hover,
  &[data-open='true'] {
    border-color: #ddd;
    color: #ddd;

    & > span {
      border-color: #ffffff;
    }
  }
`;

const SelectLinksContainer = styled.div`
  position: absolute;
  top: 100%;

  flex-direction: column;
  z-index: 1;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  background-color: #111;
  border-radius: 0.2rem;
  border: 1px solid #444444;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);

  white-space: nowrap;

  & > a {
    color: #b1b1b1;
    transition-duration: 0.2s;
    transition-property: color;

    &:hover {
      color: #ddd;
    }
  }
`;
