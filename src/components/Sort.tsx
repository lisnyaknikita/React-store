import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../store/slices/filterSlice';
import { selectSort } from '../store/slices/filterSlice';

interface ISortBy {
  name: string;
  sort: string;
}

// type PopupClick = React.MouseEvent<HTMLBodyElement> & {
//   composedPath(): Node[]
// }

export const sortBy: ISortBy[] = [
  { name: 'популярности(Desc)', sort: 'rating' },
  { name: 'популярности(Asc)', sort: '-rating' },
  { name: 'цене(Desc)', sort: 'price' },
  { name: 'цене(Asc)', sort: '-price' },
  { name: 'алфавиту(Desc)', sort: 'name' },
  { name: 'алфавиту(Asc)', sort: '-name' },
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
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
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
