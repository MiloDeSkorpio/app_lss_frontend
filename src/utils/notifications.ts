// utils/notifications.ts
import { toast, type ToastOptions } from 'react-toastify'

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
}

export const notify = {
  // Notificación de éxito (verde)
  success: (message: string, options?: ToastOptions) => 
    toast.success(message, { ...defaultOptions, ...options }),
  
  // Notificación de error (rojo)
  error: (message: string, options?: ToastOptions) => 
    toast.error(message, { ...defaultOptions, autoClose: 7000, ...options }),
  
  // Notificación de advertencia (amarillo/naranja)
  warning: (message: string, options?: ToastOptions) => 
    toast.warning(message, { ...defaultOptions, autoClose: 6000, ...options }),
  
  // Notificación informativa (azul)
  info: (message: string, options?: ToastOptions) => 
    toast.info(message, { ...defaultOptions, ...options }),
  
  // Notificación predeterminada (gris)
  default: (message: string, options?: ToastOptions) => 
    toast(message, { ...defaultOptions, ...options }),
  
  // Notificación de carga (con spinner, no se cierra automáticamente)
  loading: (message: string, options?: ToastOptions) => 
    toast.loading(message, { 
      ...defaultOptions, 
      autoClose: false,
      closeButton: false,
      ...options 
    }),
  
  // Cerrar notificaciones (todas o específica)
  dismiss: (toastId?: string | number) => toast.dismiss(toastId)
}