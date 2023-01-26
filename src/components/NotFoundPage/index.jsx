import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NotFoundPage.module.scss'

export default function NotFoundPage() {
  return (
    <div className={classes.notFound}>
        <h1 className={classes.notFoundTitle}>Страница не найдена</h1>
        <Link to='/' className={classes.notFoundBtn}>Назад ⬅️</Link>
    </div>
  )
}
