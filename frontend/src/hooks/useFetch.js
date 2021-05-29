import { useState, useEffect } from 'react'

export const useFetch = (url, deps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const aboatcont = new AbortController()

    setIsLoading(true)
    fetch(url, { signal: aboatcont.signal })
      .then((res) => {
        if (!res.ok) {
          isLoading(false)
          throw new Error('Failed to fetch..')
        }
        return res.json()
      })
      .then((data) => {
        setFetchedData(data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setHasError(true)
          setIsLoading(false)
        }
      })
    return () => aboatcont.abort()
  }, deps)

  return [isLoading, fetchedData, hasError]
}
