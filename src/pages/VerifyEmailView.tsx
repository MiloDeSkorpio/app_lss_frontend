import { useState, type FormEvent } from "react"
import { useVerifyEmail } from "../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "../utils/notifications"

const VerifyEmailView = () => {
  const location = useLocation()
  const initialEmail = location.state?.email || ""
  const [email, setEmail] = useState(initialEmail)
  const [code, setCode] = useState("")

  const [errors, setErrors] = useState<string[]>([])
  const verifyMutation = useVerifyEmail()

  const navigate = useNavigate()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors([])

    try {
      await verifyMutation.mutateAsync({ email, code })
      notify.success("Correo verificado correctamente")
      navigate("/login")
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

  const handleResend = async () => {

    navigate("/resend-code-account", { state: { email } })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verificar correo electrónico
        </h2>

        {errors.length > 0 && (
          <div className="rounded-md bg-red-100 p-4 border border-red-300 mb-4">
            <h3 className="text-sm font-medium text-red-800">
              Hubo errores en tu verificación:
            </h3>
            <ul className="mt-2 text-sm text-red-700 list-disc pl-5 space-y-1">
              {errors.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              disabled
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código de verificación</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa tu código"
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300 transition"
          >
            {verifyMutation.isPending ? "Verificando..." : "Verificar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No recibiste el código?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Reenviar código
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailView
