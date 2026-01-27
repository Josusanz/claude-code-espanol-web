export default {
  // Dropdown menus for navbar
  "claude-code": {
    title: "Claude Code",
    type: "menu",
    items: {
      "modo-facil": {
        title: "Modo Fácil",
        href: "/modo-facil"
      },
      empezar: {
        title: "Empezar",
        href: "/empezar"
      },
      fundamentos: {
        title: "Fundamentos",
        href: "/fundamentos"
      },
      proyectos: {
        title: "Proyectos",
        href: "/proyectos"
      },
      recursos: {
        title: "Recursos",
        href: "/recursos"
      }
    }
  },
  "clawdbot-menu": {
    title: "🦞 Clawdbot",
    type: "menu",
    items: {
      index: {
        title: "Empezar curso",
        href: "/clawdbot"
      },
      "que-es": {
        title: "1. ¿Qué es?",
        href: "/clawdbot/que-es"
      },
      instalacion: {
        title: "2. Instalación",
        href: "/clawdbot/instalacion"
      },
      conectar: {
        title: "3. Conectar apps",
        href: "/clawdbot/conectar-plataformas"
      },
      automatizar: {
        title: "4. Automatizar",
        href: "/clawdbot/primeras-automatizaciones"
      },
      skills: {
        title: "5. Skills",
        href: "/clawdbot/skills"
      },
      proactivas: {
        title: "6. Tareas proactivas",
        href: "/clawdbot/tareas-proactivas"
      },
      proyecto: {
        title: "7. Proyecto final",
        href: "/clawdbot/proyecto-asistente"
      }
    }
  },
  premium: {
    title: "Premium",
    type: "menu",
    items: {
      ralph: {
        title: "Ralph Loop ($47)",
        href: "/ralph"
      },
      "course-builder": {
        title: "Course Builder ($147)",
        href: "/premium/course-builder"
      },
      hub: {
        title: "Ver todos →",
        href: "/premium"
      }
    }
  },
  // Folders with sidebar - hidden from top navbar but visible in sidebar
  "modo-facil": {
    title: "Modo Fácil",
    display: "children"
  },
  empezar: {
    title: "Empezar",
    display: "children"
  },
  fundamentos: {
    title: "Fundamentos",
    display: "children"
  },
  proyectos: {
    title: "Proyectos",
    display: "children"
  },
  clawdbot: {
    title: "🦞 Clawdbot",
    display: "children"
  },
  ralph: {
    title: "Ralph Loop",
    display: "children"
  },
  recursos: {
    title: "Recursos",
    display: "children"
  },
  // Truly hidden pages
  "course-builder": {
    display: "hidden"
  },
  privacidad: {
    display: "hidden"
  },
  certificado: {
    display: "hidden"
  },
  blog: {
    display: "hidden"
  }
}
