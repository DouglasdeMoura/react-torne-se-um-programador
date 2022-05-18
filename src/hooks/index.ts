import { useEffect, useState } from "react"

export const useFetch = <T = unknown>(fetcher: () => Promise<T>) => {
  const [dados, setDados] = useState<T>()
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<Error>()

  useEffect(() => {
    setCarregando(true)

    fetcher()
      .then(data => {
        setDados(data)
      })
      .catch(error => {
        setErro(error)
      })
      .finally(() => {
        setCarregando(false)
      })
  }, [])

  return { dados, carregando, erro }
}
