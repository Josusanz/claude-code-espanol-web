// =============================================================================
// TIPOS BASE PARA LOS 3 TIPOS DE CURSOS
// =============================================================================

// Tipo de curso
export type CourseType = 'visual' | 'terminal' | 'traditional'

// Contenido multimedia compartido
export interface MediaContent {
  type: 'video' | 'image' | 'gif' | 'diagram' | 'code'
  url?: string
  videoId?: string
  videoProvider?: 'youtube' | 'vimeo' | 'self'
  code?: string
  language?: string
  caption?: string
  alt?: string
  duration?: string // Para videos: "5:30"
}

// =============================================================================
// CURSO VISUAL BUILDER - Para construir UIs paso a paso
// =============================================================================
export interface VisualStep {
  id: string
  title: string
  description: string
  command: string // Lo que escribe el usuario
  // El preview se renderiza basándose en el step completado
  previewComponent?: string // Nombre del componente a mostrar
}

export interface VisualCourse {
  type: 'visual'
  id: string
  title: string
  description: string
  category: string // "Web3", "Landing Pages", "E-commerce", etc.
  steps: VisualStep[]
  // Componente de preview personalizado
  previewType: string // "web3-landing", "ecommerce", "portfolio", etc.
}

// =============================================================================
// CURSO TERMINAL - Para programación y DevOps
// =============================================================================
export interface TerminalLesson {
  id: string
  title: string
  instruction: string
  commandToType: string
  terminalResponse: string
  successKeywords?: string[]
  theory?: string // HTML con explicación
  media?: MediaContent[]
  aiContext?: string // Contexto para el tutor IA
}

export interface TerminalModule {
  id: string
  number: string
  title: string
  description: string
  lessons: TerminalLesson[]
  introVideo?: {
    videoId: string
    provider: 'youtube' | 'vimeo'
    duration: string
  }
}

export interface TerminalCourse {
  type: 'terminal'
  id: string
  title: string
  description: string
  category: string // "Backend", "DevOps", "CLI", etc.
  modules: TerminalModule[]
}

// =============================================================================
// CURSO TRADICIONAL - Videos, texto, quizzes
// =============================================================================
export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Quiz {
  id: string
  question: string
  options: QuizOption[]
  explanation?: string // Se muestra después de responder
}

export interface TraditionalLesson {
  id: string
  title: string
  duration: string // "5:30"
  // Contenido principal
  video?: {
    url?: string
    videoId?: string
    provider?: 'youtube' | 'vimeo' | 'self'
  }
  content?: string // Markdown/HTML con el contenido
  images?: MediaContent[]
  // Quiz opcional al final
  quiz?: Quiz
  // Recursos descargables
  downloads?: Array<{
    title: string
    url: string
    type: 'pdf' | 'zip' | 'image'
  }>
}

export interface TraditionalModule {
  id: string
  number: string
  title: string
  description: string
  lessons: TraditionalLesson[]
}

export interface TraditionalCourse {
  type: 'traditional'
  id: string
  title: string
  description: string
  category: string // "Yoga", "Cocina", "Música", etc.
  modules: TraditionalModule[]
  instructor?: {
    name: string
    bio: string
    avatar?: string
  }
}

// =============================================================================
// TIPO UNIÓN
// =============================================================================
export type Course = VisualCourse | TerminalCourse | TraditionalCourse

// =============================================================================
// HELPERS
// =============================================================================
export function getCourseTypeLabel(type: CourseType): string {
  switch (type) {
    case 'visual':
      return 'Visual Builder'
    case 'terminal':
      return 'Terminal Interactivo'
    case 'traditional':
      return 'Curso Tradicional'
  }
}

export function getCourseTypeIcon(type: CourseType): string {
  switch (type) {
    case 'visual':
      return '🎨'
    case 'terminal':
      return '💻'
    case 'traditional':
      return '📚'
  }
}

export function getCourseTypeDescription(type: CourseType): string {
  switch (type) {
    case 'visual':
      return 'Construye paso a paso y mira el resultado en tiempo real'
    case 'terminal':
      return 'Aprende comandos con un tutor IA que te guía'
    case 'traditional':
      return 'Videos, texto e imágenes con quizzes interactivos'
  }
}
