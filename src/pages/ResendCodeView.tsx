import { useState, type FormEvent } from "react"
import { useResendCode } from "../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "../utils/notifications"

const ResendCodeView = () => {
  const location = useLocation()
  const initialEmail = location.state?.email || ""
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState<string | null>(null)

  const resendMutation = useResendCode()
  const navigate = useNavigate()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await resendMutation.mutateAsync({ email })
      notify.success("Código de verificación reenviado correctamente")
      navigate("/verify-account", { state: { email } })
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Error al reenviar código")
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reenviar código de verificación
        </h2>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="code"
              type="email"
              value={email}
              readOnly
              disabled
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={resendMutation.isPending}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300 transition"
          >
            {resendMutation.isPending ? "Enviando..." : "Reenviar código"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResendCodeView
