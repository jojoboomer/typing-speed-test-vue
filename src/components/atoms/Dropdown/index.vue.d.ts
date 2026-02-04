import { DefineComponent } from 'vue'

declare const component: DefineComponent<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  {
    title: () => void
  }
>
export default component
