import React from 'react'
import s from './Message.module.css'
import { MessageType } from '../HW1'  // импортируем тип

// правильный тип пропсов
export type MessagePropsType = {
  message: MessageType
}

// отображаем данные
const Message = (props: MessagePropsType) => {
  return (
    <div id={'hw1-message-' + props.message.id} className={s.message}>
      <div className={s.imageAndText}>
        <img
          id={'hw1-avatar-' + props.message.id}
          src={props.message.user.avatar}   // отображаем аватар
          alt={props.message.user.name}
        />
        <div className={s.text}>
          <div id={'hw1-name-' + props.message.id} className={s.name}>
            {props.message.user.name}  {/* отображаем имя */}
          </div>
          <pre id={'hw1-text-' + props.message.id} className={s.messageText}>
                        {props.message.message.text} {/* отображаем текст */}
                    </pre>
        </div>
      </div>
      <div id={'hw1-time-' + props.message.id} className={s.time}>
        {props.message.message.time} {/* отображаем время */}
      </div>
    </div>
  )
}

export default Message
