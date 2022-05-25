import { RefreshDouble } from 'iconoir-react'

export const Loading = () => (
  <div style={{
    width: '100%',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }}>
    <RefreshDouble
      style={{
        animationName: 'spin',
        animationDuration: '1000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      }}
    />
  </div>)
