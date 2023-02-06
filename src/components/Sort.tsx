import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../store/slices/filterSlice';
import { selectSort } from '../store/slices/filterSlice';

interface ISortBy {
  name: string;
  sort: string;
}

export const sortBy: ISortBy[] = [
  { name: 'Популярности(По убыванию)', sort: 'rating' },
  { name: 'Популярности(По возростанию)', sort: '-rating' },
  { name: 'Цене(По убыванию)', sort: 'price' },
  { name: 'Цене(По возростанию)', sort: '-price' },
  { name: 'Алфавиту(По убыванию)', sort: 'name' },
  { name: 'Алфавиту(По возростанию)', sort: '-name' },
];

export default function Sort() {
  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const sort: any = useSelector(selectSort);

  const [modal, setModal] = useState(false);

  function selectSortHandler(obj: ISortBy) {
    dispatch(setSort(obj));
    setModal(false);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath(): Node[]
      }
      if (!_event.composedPath().includes(sortRef.current)) {
        setModal(false);
      }
    };
    
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  console.log(sort.name);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => setModal(!modal)}>{sort.name}</span>
      </div>
      {modal ? (
        <div className='sort__popup'>
          <ul>
            {sortBy.map((obj, id) => (
              <li
                key={id}
                className={sort.sort === obj.sort ? 'active' : ''}
                onClick={() =>
                  selectSortHandler({ name: obj.name, sort: obj.sort })
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
