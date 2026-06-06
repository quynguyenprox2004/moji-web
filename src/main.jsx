// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'

// Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Cấu hình Redux Store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        buttonOrder: ['cancel', 'confirm'],
        cancellationButtonProps: { color: 'inherit' },
        confirmationButtonProps: { color: 'error', variant: 'contained' }
      }}>
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)
