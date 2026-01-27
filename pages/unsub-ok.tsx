import Head from 'next/head'

export default function UnsubConfirmado() {
  return (
    <>
      <Head>
        <title>Te has dado de baja | aprende.software</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-6">👋</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Te has dado de baja
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No recibirás más emails de la secuencia del curso.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            Si cambias de opinión, siempre puedes volver a registrarte.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </>
  )
}
