import Link from 'next/link'

interface PremiumCTAProps {
  variant?: 'ralph' | 'coursebuilder' | 'both'
}

export function PremiumCTA({ variant = 'both' }: PremiumCTAProps) {
  if (variant === 'ralph') {
    return (
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔄</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">
              ¿Quieres que Claude trabaje solo durante horas?
            </h3>
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
              Con <strong>Ralph Loop</strong> aprenderás a configurar Claude Code en piloto automático.
              Construye proyectos completos mientras solo supervisas.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/ralph"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition"
              >
                Ver Ralph Loop - $47
              </Link>
              <span className="text-purple-600 dark:text-purple-400 text-sm">8 lecciones + templates</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'coursebuilder') {
    return (
      <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎓</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              ¿Quieres crear tu propio curso con IA?
            </h3>
            <p className="text-amber-800 dark:text-amber-200 text-sm mb-4">
              <strong>Course Builder</strong> te enseña a crear cursos interactivos como este usando Claude Code.
              Incluye templates, estrategias de monetización y el sistema completo.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/premium/course-builder"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition"
              >
                Ver Course Builder - $147
              </Link>
              <span className="text-amber-600 dark:text-amber-400 text-sm">6 módulos + 2 cursos ejemplo</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Both products
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 text-center">
        ¿Listo para el siguiente nivel?
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Ralph Loop */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔄</span>
            <span className="font-bold text-purple-700 dark:text-purple-300">Ralph Loop</span>
            <span className="ml-auto text-purple-600 font-bold">$47</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Claude en piloto automático 24/7
          </p>
          <Link
            href="/ralph"
            className="block text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
          >
            Ver curso
          </Link>
        </div>

        {/* Course Builder */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-amber-700 dark:text-amber-300">Course Builder</span>
            <span className="ml-auto text-amber-600 font-bold">$147</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Crea y vende cursos con IA
          </p>
          <Link
            href="/premium/course-builder"
            className="block text-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition"
          >
            Ver curso
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
        Acceso de por vida · Garantía 14 días
      </p>
    </div>
  )
}

export default PremiumCTA
