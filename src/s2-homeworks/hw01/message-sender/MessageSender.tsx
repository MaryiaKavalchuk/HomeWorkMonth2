import React, { useEffect, useRef, useState } from 'react'
import { MessageType, message0 } from '../HW1'
import s from './MessageSender.module.css'

type MessageSenderPropsType = {
    M: React.ComponentType<{ message: MessageType }>
}

const MessageSender: React.FC<MessageSenderPropsType> = ({ M }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [messages, setMessages] = useState<MessageType[]>([])
    const [text, setText] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '0px'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [text])

    const addMessage = () => {
        if (!text.trim()) return
        setMessages([
            ...messages,
            {
                id: messages.length ? messages.length + 1 : 1,
                user: message0.user,
                message: {
                    text,
                    time: new Date().toTimeString().slice(0, 5),
                },
            },
        ])
        setTimeout(() => setText(''), 0)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault()
            addMessage()
        }
    }

    return (
      <>
          {messages.map((m) => (
            <M key={'message' + m.id} message={m} />
          ))}

          <div id={'hw1-send-message-form'} className={s.sendForm}>
                <textarea
                  id={'hw1-textarea'}
                  className={s.textarea}
                  ref={textareaRef}
                  title={'Shift+Enter for send'}
                  placeholder={'Type your message'}
                  value={text}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                />
              <button
                id={'hw1-button'}
                className={s.button}
                onClick={addMessage}
              >
                  Send
              </button>
          </div>
      </>
    )
}

export default MessageSender
