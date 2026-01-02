import React, { useState } from 'react'
import { v1 } from 'uuid'
import s2 from '../../s1-main/App.module.css'
import GreetingContainer from './GreetingContainer'

// 1️⃣ Тип пользователя
export type UserType = {
    _id: string
    name: string
}

// чистая функция добавления пользователя
export const pureAddUserCallback = (
  name: string,
  setUsers: (users: UserType[]) => void,
  users: UserType[]
) => {
    if (!name.trim()) return
    const user: UserType = {
        _id: v1(),
        name: name.trim(),
    }
    setUsers([...users, user])
}

const HW3 = () => {
    // 2️⃣ useState с пользователями
    const [users, setUsers] = useState<UserType[]>([])

    const addUserCallback = (name: string) => {
        pureAddUserCallback(name, setUsers, users)
    }

    return (
      <div id={'hw3'}>
          <div className={s2.hwTitle}>Homework #3</div>
          <div className={s2.hw}>
              <GreetingContainer
                users={users}
                addUserCallback={addUserCallback}
              />
          </div>
      </div>
    )
}

export default HW3
