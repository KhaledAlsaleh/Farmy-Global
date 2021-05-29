import ReactGA from 'react-ga'
const useEventGaTracker = (category = 'Event Category') => {
  const trackEvents = (action = 'action', label = 'label') => {
    ReactGA.event({
      category,
      action,
      label,
    })
  }
  return trackEvents
}

export default useEventGaTracker
