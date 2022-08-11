import { createContext, FC, useContext, useState } from 'react'

type MyContextType = {
  name: string
  age: number
  city: string
  setName: (name: string) => void
}

const MyContext = createContext({} as MyContextType)

const useMyContext = () => useContext(MyContext)

const Nome: FC = () => {
  const { name, setName } = useMyContext()

  return (
    <p>
      {name} <button onClick={() => setName('Rafael')}>Trocar nome</button>
    </p>
  )
}

const Idade: FC = () => {
  const { name, age } = useMyContext()

  return (
    <p>
      {name}, {age}
    </p>
  )
}

const Cidade: FC = () => {
  const { city } = useMyContext()

  return <p>{city}</p>
}

export const Dashboard: FC = () => {
  const [name, setName] = useState('Douglas')

  return (
    <>
      <h1>Dashboard</h1>
      <MyContext.Provider
        value={{
          name,
          age: 30,
          city: 'São Paulo',
          setName,
        }}
      >
        <Nome />
        <Idade />
        <Cidade />
      </MyContext.Provider>
    </>
  )
}
