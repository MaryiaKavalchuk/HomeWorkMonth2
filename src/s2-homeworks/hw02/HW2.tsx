import React, { useState } from 'react'
import Affairs from './affairs/Affairs'
import s2 from '../../s1-main/App.module.css'

// 1️⃣ Типы
export type AffairPriorityType = 'high' | 'middle' | 'low'
export type AffairType = {
    _id: number
    name: string
    priority: AffairPriorityType
}
export type FilterType = 'all' | AffairPriorityType

// 2️⃣ Константы
const defaultAffairs: AffairType[] = [
    { _id: 1, name: 'React', priority: 'high' },
    { _id: 2, name: 'anime', priority: 'low' },
    { _id: 3, name: 'games', priority: 'low' },
    { _id: 4, name: 'work', priority: 'high' },
    { _id: 5, name: 'html & css', priority: 'middle' },
]

// 3️⃣ Чистые функции
export const filterAffairs = (affairs: AffairType[], filter: FilterType): AffairType[] => {
    if (filter === 'all') return affairs
    return affairs.filter(a => a.priority === filter)
}

export const deleteAffair = (affairs: AffairType[], _id: number): AffairType[] => {
    return affairs.filter(a => a._id !== _id)
}

// 5️⃣ HW2 компонент
function HW2() {
    const [affairs, setAffairs] = useState<AffairType[]>(defaultAffairs)
    const [filter, setFilter] = useState<FilterType>('all')

    const filteredAffairs = filterAffairs(affairs, filter)

    // 6️⃣ Коллбек удаления
    const deleteAffairCallback = (_id: number) => {
        setAffairs(deleteAffair(affairs, _id))
    }

    return (
      <div id={'hw2'}>
          <div className={s2.hwTitle}>Homework #2</div>
          <div className={s2.hw}>
              <Affairs
                data={filteredAffairs}
                setFilter={setFilter}
                deleteAffairCallback={deleteAffairCallback}
                filter={filter}
              />
          </div>
      </div>
    )
}

export default HW2
