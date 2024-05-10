import { Provider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'

import { Router } from '@/router'
import { store } from '@/services'

import 'react-toastify/dist/ReactToastify.css'

import { ErrorToast } from './components'

export function App() {
  return (
    <div>
      <Provider store={store}>
        <Router />
        <ErrorToast />
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable={false}
          hideProgressBar={false}
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover
          position={'bottom-left'}
          rtl={false}
          theme={'dark'}
          transition={Bounce}
        />
      </Provider>
    </div>
  )
}
