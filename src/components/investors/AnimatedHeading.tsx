import {
  Fragment,
  useEffect,
  useState,
  type CSSProperties,
} from 'react'

interface AnimatedHeadingProps {
  /** Текст; переносы строк задаются через \n. */
  text: string
  className?: string
  style?: CSSProperties
  /** Начальная задержка перед стартом анимации, мс. */
  initialDelay?: number
}

const CHAR_DELAY = 30 // мс между символами
const CHAR_DURATION = 500 // мс на переход одного символа

/**
 * Посимвольная entrance-анимация заголовка (стиль VEX): каждый символ
 * стартует с opacity 0 / translateX(-18px) и переходит к 1 / 0 со
 * ступенчатой задержкой (lineIndex*lineLength + charIndexInLine) * CHAR_DELAY.
 *
 * Символы группируются по словам (whitespace-nowrap), чтобы строка не
 * разрывалась посреди слова — при этом индекс символа считается по всей
 * строке, как в оригинальной спецификации.
 */
export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
}: AnimatedHeadingProps) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay)
    return () => clearTimeout(t)
  }, [initialDelay])

  const lines = text.split('\n')

  const charStyle = (delay: number): CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateX(0)' : 'translateX(-18px)',
    transition: `opacity ${CHAR_DURATION}ms ease, transform ${CHAR_DURATION}ms ease`,
    transitionDelay: `${delay}ms`,
  })

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        // Позиция начала каждого слова внутри строки (включая пробелы).
        let cursor = 0
        const words = line.split(' ').map((text) => {
          const word = { text, start: cursor }
          cursor += text.length + 1 // +1 — пробел-разделитель
          return word
        })

        return (
          <span key={lineIndex} className="block">
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {word.text.split('').map((char, j) => (
                    <span
                      key={j}
                      className="inline-block"
                      style={charStyle(
                        (lineIndex * line.length + word.start + j) * CHAR_DELAY,
                      )}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        )
      })}
    </h1>
  )
}
