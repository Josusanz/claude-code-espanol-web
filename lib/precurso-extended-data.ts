// Extensiones del precurso por curso
// El precurso base tiene 5 módulos comunes. Cada curso puede tener contenido
// de preparación adicional que se muestra después de completar la base.

export interface PrecursoExtension {
  courseId: string // 'autoguiado' | 'negocio' | ...
  titulo: string
  descripcion: string
  modulos: PrecursoExtraModulo[]
}

export interface PrecursoExtraModulo {
  id: string
  titulo: string
  emoji: string
  descripcion: string
  href: string // URL de la página con el contenido
}

export const PRECURSO_EXTENSIONS: PrecursoExtension[] = [
  {
    courseId: 'autoguiado',
    titulo: 'Preparacion para el Curso Autoguiado',
    descripcion: 'Modulos extra para prepararte antes de empezar a crear tu software.',
    modulos: [
      {
        id: 'prep-autoguiado',
        titulo: 'Prepara tu proyecto',
        emoji: '🎯',
        descripcion: 'Define tu idea de software, configura tu entorno y prepara tu plan de accion antes de empezar el modulo 1.',
        href: '/curso/prep-autoguiado',
      },
    ],
  },
]

export function getExtensionForCourse(courseId: string): PrecursoExtension | undefined {
  return PRECURSO_EXTENSIONS.find(ext => ext.courseId === courseId)
}

export function getUserCourseId(): string | null {
  // For now, if a user has precurso access, check if they have autoguiado progress
  // In the future this could be determined by purchase data
  if (typeof window === 'undefined') return null
  try {
    const autoguiadoProgress = localStorage.getItem('autoguiado-progress')
    if (autoguiadoProgress) {
      return 'autoguiado'
    }
  } catch {
    // Ignore
  }
  return 'autoguiado' // default for now
}
