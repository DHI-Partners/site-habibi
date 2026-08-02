import { createContext, useContext } from 'react'

/**
 * Контекст открытия модалки-«шлюза» перед скачиванием финмодели.
 * Провайдер — InvestorDeck; потребители — кнопки «Скачать фин модель»
 * в навбаре и в hero-слайде.
 */
export const DownloadGateContext = createContext<() => void>(() => {})

export const useDownloadGate = () => useContext(DownloadGateContext)
