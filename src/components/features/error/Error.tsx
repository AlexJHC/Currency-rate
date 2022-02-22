import React, {useEffect} from 'react'
import style from './Error.module.css'

type ErrorPropsType = {
  disableError: () => void
  isError: boolean
}

export default React.memo(function Error({disableError, isError}: ErrorPropsType) {

  const errorStyle = isError ? style.active : ''

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isError) {
      timer = setTimeout(() => {
        disableError()
      }, 4000)
    }
    return () => clearTimeout(timer)
  }, [isError, disableError])

  return (
    <div className={`${style.error} ${errorStyle}`}>
      Network error, please try again later
    </div>
  )

})

