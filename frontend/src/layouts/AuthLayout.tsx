import { Outlet } from 'react-router-dom'
import taskerLogo from '../assets/images/tasker-new.png'
const AuthLayout = () => {
  return (
      <>
        <div className='w-full flex flex-col items-center justify-center'>
              <div className='w-36 md:w-48 mt-16'>
                  <img src={taskerLogo} alt="tasker" />
              </div>
              <div>
                <Outlet/>
              </div>
        </div>

      </>
  )
}

export default AuthLayout
