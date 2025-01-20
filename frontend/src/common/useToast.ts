import { toast } from 'vue3-toastify'

const config = {
    autoClose: 1500,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    dangerouslyHTMLString: false,
    hideProgressBar: false,
  }

  export const useToast = () => {
  
    const toastTypeDefault = (msg:any) => {
      toast(msg, {
        ...config,
      })
    }
  
    const toastTypeInfo = (msg:any) => {
      toast(msg, {
        ...config,
        type: 'info',
      })
    }
  
    const toastTypeSuccess = (msg:any) => {
      toast(msg, {
        ...config,
        type: 'success',
      })
    }
  
    const toastTypeWarning = (msg:any) => {
      toast(msg, {
        ...config,
        type: 'warning',
      })
    }
  
    const toastTypeError = (msg:any) => {
      toast(msg, {
        ...config,
        type: 'error',
      })
    }
  
    return { toastTypeDefault, toastTypeInfo, toastTypeSuccess, toastTypeWarning, toastTypeError }
  
  }