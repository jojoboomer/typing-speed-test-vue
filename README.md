# Vue Typing Challenge ⌨️

Una aplicación de prueba de velocidad de escritura moderna y responsive, construida con **Vue 3**, **Pinia**, **Tailwind CSS** y **TypeScript**.

🚀 **[Demo en vivo](https://quicktype-six.vercel.app/)**

## 📋 Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Setup y desarrollo](#setup-y-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Testing](#testing)
- [Lo que aprendí](#lo-que-aprendí)
- [Próximos pasos](#próximos-pasos)
- [Autor](#autor)

## ✨ Características

- **3 modos de juego:**
  - **Timed**: 60 segundos de prueba
  - **Relaxed**: 120 segundos sin presión
  - **Passage**: Completa el pasaje sin límite de tiempo

- **3 niveles de dificultad:** Easy, Medium, Hard
- **4 categorías de textos:** General, Programming, Quotes, Numbers
- **Métricas en tiempo real:**
  - WPM (Palabras Por Minuto)
  - Accuracy (Precisión)
  - Errores por tecla (heatmap)
- **Configuración personalizable**
  - Accuracy mínima requerida (configurable)
  - Guardar preferencias
- **Diseño responsive** para todos los dispositivos
- **Testing completo:** Unit tests (Vitest) + E2E (Playwright)

## 🛠️ Tecnologías

| Stack         | Herramientas        |
| ------------- | ------------------- |
| **Framework** | Vue 3 + TypeScript  |
| **State**     | Pinia               |
| **Styling**   | Tailwind CSS        |
| **Build**     | Vite                |
| **Testing**   | Vitest + Playwright |
| **Linting**   | ESLint + Prettier   |

## 🚀 Setup y desarrollo

### Requisitos previos
- Node.js 18+ 
- Yarn 3.6+

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/jojoboomer/typing-speed-test-vue
cd vue-typing-challenge

# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo (localhost:5173)
yarn dev
```

### Comandos útiles

```bash
yarn build         # Build para producción
yarn preview       # Previsualizar build
yarn lint          # Ejecutar ESLint y formatear
yarn type-check    # Verificar tipos TypeScript

# Testing
yarn test          # Unit tests (Vitest)
yarn test:e2e      # E2E tests (Playwright)
yarn test:e2e:ui   # E2E tests con UI de Playwright
```

## 📁 Estructura del proyecto

```
src/
├── assets/              # Imágenes e iconos
├── components/
│   ├── atoms/          # Elementos base (Button, Drawer, etc.)
│   ├── molecules/      # Componentes combinados
│   └── organisms/      # Componentes complejos
├── composables/        # Vue composables reutilizables
├── data/              # Datos de pasajes para typing
├── lib/               # Utilidades y servicios
│   ├── passageService.ts
│   ├── typing-utils.ts
│   └── utils.ts
├── store/             # Pinia store
│   └── typing.store.ts
├── pages/             # Vistas de la aplicación
├── types.ts           # Tipos TypeScript compartidos
├── App.vue            # Componente raíz
└── main.ts            # Punto de entrada

e2e/                   # Tests E2E (Playwright)
src/__tests__/         # Tests unitarios (Vitest)
```

## 🧪 Testing

### Unit Tests (Vitest)
Tests para lógica de stores, composables y utilidades:

```bash
yarn test              # Ejecutar tests
yarn test --ui         # Con interfaz gráfica
```

### E2E Tests (Playwright)
Tests de flujos de usuario y interacciones:

```bash
yarn test:e2e          # Modo headless
yarn test:e2e:ui       # Con interfaz de Playwright
```

## 🎓 Lo que aprendí

Este proyecto me permitió profundizar en varios aspectos de Vue 3:

### Composition API
- `ref`, `computed`, `watch` para reactividad
- Extracción de lógica con composables personalizados
- Patrones de optimización y rendimiento

### Pinia & State Management
- Estructura clara de store con state, getters y actions
- Manejo de estado complejo en aplicaciones interactivas
- Persistencia y sincronización de datos

### Atomic Design
Organización modular de componentes en 4 niveles:
- **Atoms**: Elementos indivisibles (Button, Drawer, Modal)
- **Molecules**: Combinaciones funcionales (ConfigDrawer, GameStats)
- **Organisms**: Secciones complejas (GameBoard, Header)
- **Templates**: Layouts completos

### TypeScript
- Union types con `as const`
- Tipado exhaustivo de props y emits
- Interfaces para contratos claros

### Tailwind CSS
- Enfoque utility-first puro (sin CSS personalizado)
- Estrategia responsive con breakpoints
- Creación de sistema de diseño consistente

### Testing
- Unit tests con Vitest
- E2E tests con Playwright
- Mocking de datos externos

## 📈 Próximos pasos

- [ ] Agregar persistencia (localStorage/IndexedDB)
- [ ] Implementar sistema de ranking
- [ ] Agregar estadísticas históricas
- [ ] Soporte para modo offline
- [ ] Integración con API backend (opcional)
- [ ] Temas oscuro/claro
- [ ] Múltiples idiomas

## 📚 Recursos útiles

- [Vue 3 Documentation](https://vuejs.org/) - Guía oficial de Vue 3
- [Pinia Documentation](https://pinia.vuejs.org/) - State management para Vue
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Vite Documentation](https://vite.dev/) - Build tool ultrarrápido
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guía de TypeScript
- [Vitest](https://vitest.dev/) - Framework de testing para Vue
- [Playwright](https://playwright.dev/) - E2E testing automation

## 💡 Contribuir

Si encuentras bugs o tienes sugerencias, siéntete libre de abrir un issue o pull request.

## 👤 Autor

**José J. Labrada Carmenate**
- 🌐 Portafolio: [jojoboomer.github.io](https://jojoboomer.github.io/)
- 💼 LinkedIn: [@joellabrada](https://www.linkedin.com/in/joellabrada)
- 🏆 Frontend Mentor: [@jojoboomer](https://www.frontendmentor.io/profile/jojoboomer)
- 🐙 GitHub: [@jojoboomer](https://github.com/jojoboomer)

## 📝 Normas de desarrollo

Para colaborar en este proyecto, consulta [INSTRUCTIONS.md](./INSTRUCTIONS.md) donde encontrarás:
- Convenciones de código
- Estructura de componentes
- Patrones de Pinia
- Estándares de testing
- Guía de commits

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

---

**Nota:** Este proyecto es una solución al [Typing Speed Test Challenge de Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test).
