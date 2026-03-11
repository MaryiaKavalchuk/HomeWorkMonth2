import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
  {
    value,
    onChange,
    onChangeText,
    onKeyDown,
    onEnter,
    error,
    className,
    spanClassName,
    id,
    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeText) {
      onChangeText(e.currentTarget.value)
    } else {
      onChange?.(e)
    }
  }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e)

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    const finalSpanClassName = s.error
        + (spanClassName ? ' ' + spanClassName : '')
    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : ' ' + s.superInput)
        + (className ? ' ' + className : '') // задача на смешивание классов

    return (
        <div className={s.inputWrapper}>
          <input
            id={id}
            type={'text'}
            {...restProps}
            value={value}
            onChange={onChangeCallback}
            onKeyDown={onKeyPressCallback}
            className={finalInputClassName}

          />
            <span
                id={id ? id + '-span' : undefined}
                className={finalSpanClassName}
            >
                {error}
            </span>
        </div>
    )
}

export default SuperInputText
