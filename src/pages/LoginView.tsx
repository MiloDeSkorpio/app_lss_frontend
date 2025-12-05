import { type FormEvent, useState } from "react"
import { useLogin } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { notify } from "../utils/notifications"

const LoginView = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const loginMutation = useLogin()
  const queryClient = useQueryClient()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await loginMutation.mutateAsync({ email, password })
      await queryClient.invalidateQueries({ queryKey: ["authUser"] })
      notify.success('¡Inicio de sesión exitoso!')
      navigate("/")
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al iniciar sesión"
      setError(msg)
    }
  }

  return (
   <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-200">
          Iniciar sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 transition-all">
          <form onSubmit={onSubmit} className="space-y-6">

            {/* ERROR MESSAGE */}
            {error && (
              <div className="rounded-md bg-red-100 p-4 border border-red-300">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-red-500 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-3 text-sm font-medium text-red-900">{error}</p>
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@ejemplo.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Contraseña
              </label>

              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2
                  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700 transition"
                />

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.06 7.033 19 12 19c1.83 0 3.558-.412 5.086-1.148M6.228 6.228A10.451 10.451 0 0112 5c4.968 0 8.774 2.94 10.066 7-.455 1.453-1.23 2.77-2.268 3.86M6.228 6.228L3 3m3.228 3.228l12.544 12.544" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
              shadow-md text-sm font-semibold text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed
              transition-all duration-200 hover:scale-[1.02]"
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-6">
            <hr className="border-gray-300 mb-4" />

            <div className="flex items-center justify-between text-xs space-x-2">
              <a href="/register" className="text-gray-600 hover:text-gray-800 transition">
                ¿No tienes cuenta? Crear una
              </a>
              <a href="/recuperar-password" className="text-gray-600 hover:text-gray-800 transition">
                Olvidé mi contraseña
              </a>
              <a href="/verify-account" className="text-gray-600 hover:text-gray-800 transition">
                Verifica tu cuenta
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginView
