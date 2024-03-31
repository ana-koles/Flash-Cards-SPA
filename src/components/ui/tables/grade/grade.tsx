import { StarIcon } from '@/assets/icons/star'
import { StarOutlineIcon } from '@/assets/icons/star-outline'

import s from './grade.module.scss'

type Props = {
  maxGrade: number
  onClick: (value: number) => void
  value: number
}

export const Grade = ({ maxGrade, onClick, value }: Props) => {
  const stars = Array.from({ length: maxGrade }, (_, i) => i + 1)

  const classNames = {
    grade: s.grade,
  }

  return (
    <div className={classNames.grade}>
      {stars.map(star => (
        <Star key={star} onClick={onClick} selected={value >= star} value={star} />
      ))}
    </div>
  )
}

type StarProps = {
  onClick: (value: number) => void
  selected: boolean
  value: number
}

const Star = ({ onClick, selected, value }: StarProps) => {
  const handleClick = () => onClick(value)

  const classNames = {
    star: s.star,
  }

  return (
    <span className={classNames.star} onClick={handleClick}>
      {selected ? <StarIcon /> : <StarOutlineIcon />}
    </span>
  )
}
