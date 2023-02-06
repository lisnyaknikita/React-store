import React from 'react';

interface ICategoriesProps {
  categoryId: number;
  onClickCategory: (id: number) => void;
}

export const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export default function Categories({
  categoryId,
  onClickCategory,
}: ICategoriesProps) {
  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              className={categoryId === i ? 'active' : ''}
              onClick={() => onClickCategory(i)}
              key={i}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
