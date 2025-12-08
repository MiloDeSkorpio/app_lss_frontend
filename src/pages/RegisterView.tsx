import { type FormEvent, useState } from "react"
import { useRegister } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { notify } from "../utils/notifications"

const RegisterView = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const registerMutation = useRegister()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const validateForm = () => {
    const errs: string[] = []
    const { name, email, password, confirmPassword } = form

    if (!name.trim()) errs.push("El campo Nombre es obligatorio")

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) errs.push("El formato del email no es válido")
    } else {
      errs.push("El campo Email es obligatorio")
    }

    if (password.trim()) {
      if (password.length < 8)
        errs.push("La contraseña debe tener al menos 8 caracteres")

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]+$/
      if (!passwordRegex.test(password))
        errs.push(
          "La contraseña debe incluir mayúsculas, minúsculas, números y un carácter especial: $ @ ! % * ? &"
        )
    } else {
      errs.push("El campo Contraseña es obligatorio")
    }

    if (!confirmPassword.trim())
      errs.push("Es necesario confirmar la contraseña")

    if (password !== confirmPassword)
      errs.push("Las contraseñas no coinciden")

    return errs
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const { name, email, password } = form
      await registerMutation.mutateAsync({ name, email, password })
      await queryClient.invalidateQueries({ queryKey: ["authUser"] })
      notify.success("¡Registro exitoso! Por favor, verifica tu correo.")
      navigate("/verify-account", { state: { email } })
    } catch (err: any) {
      const backendErrors = err?.response?.data?.errors

      if (Array.isArray(backendErrors)) {
        const msgs = backendErrors.map((e: any) =>
          String(Object.values(e.constraints)[0])
        )
        setErrors(msgs)
      } else {
        setErrors([
          err?.response?.data?.message || "Error al procesar la petición"
        ])
      }
    }
  }

  const inputError = (field: string) =>
    errors.some((e) => e.toLowerCase().includes(field))

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-200">
          Crear una cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* ERROR LIST */}
            {errors.length > 0 && (
              <div className="rounded-md bg-red-100 p-4 border border-red-300 mb-4">
                <h3 className="text-sm font-medium text-red-800">
                  Hubo errores en tu registro:
                </h3>
                <ul className="mt-2 text-sm text-red-700 list-disc pl-5 space-y-1">
                  {errors.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* NAME */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={`mt-1 block w-full px-3 py-2 border rounded-lg text-gray-800 sm:text-sm focus:ring-2 transition
                  ${inputError("nombre")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
            </div>
            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@ejemplo.com"
                className={`mt-1 block w-full px-3 py-2 border rounded-lg text-gray-800 sm:text-sm focus:ring-2 transition
                  ${inputError("email")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`block w-full px-3 py-2 border rounded-lg text-gray-700 sm:text-sm 
                    focus:ring-2 transition ${inputError("contraseña")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                    }`}
                />
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

            {/* CONFIRM PASSWORD */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`block w-full px-3 py-2 border rounded-lg text-gray-700 sm:text-sm 
                    focus:ring-2 transition ${inputError("contraseña")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
                >
                  {showConfirm ? (
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
              disabled={registerMutation.isPending}
              className="w-full flex justify-center py-2 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 
                hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                disabled:bg-indigo-300 disabled:cursor-not-allowed transition hover:scale-[1.02]"
            >
              {registerMutation.isPending ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-6">
            <hr className="border-gray-300 mb-4" />
            <div className="flex items-center justify-between text-xs">
              <a href="/login" className="text-gray-600 hover:text-gray-800">
                ¿Ya tienes cuenta? Iniciar sesión
              </a>
              <a
                href="/recuperar-password"
                className="text-gray-600 hover:text-gray-800"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
