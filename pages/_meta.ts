export default {
  // Dropdown: Curso Gratuito
  curso: {
    title: "Curso",
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
  // Dropdown: Premium
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
        href: "/course-builder"
      },
      hub: {
        title: "Ver todos →",
        href: "/premium"
      }
    }
  },
  // Hidden from navbar but accessible via sidebar
  "modo-facil": {
    title: "Modo Fácil",
    theme: { navbar: false }
  },
  empezar: {
    title: "Empezar",
    theme: { navbar: false }
  },
  fundamentos: {
    title: "Fundamentos",
    theme: { navbar: false }
  },
  proyectos: {
    title: "Proyectos",
    theme: { navbar: false }
  },
  ralph: {
    title: "Ralph Loop",
    theme: { navbar: false }
  },
  "course-builder": {
    title: "Course Builder",
    theme: { navbar: false }
  },
  recursos: {
    title: "Recursos",
    theme: { navbar: false }
  },
  privacidad: {
    display: "hidden"
  }
}
