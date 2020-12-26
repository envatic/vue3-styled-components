import * as CSS from 'csstype'
import * as Vue from 'vue'

type CSSProperties = CSS.Properties<string | number>

type CSSPseudos = { [K in keyof CSS.Pseudos]?: CSSObject }

interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined
}

type VueProps =
  | {
      [propsName: string]: {
        type: new (...args: any[]) => unknown
        default?: unknown
        required?: boolean
        validator?(value: unknown): boolean
      }
    }
  | {
      [propsName: string]: new (...args: any[]) => unknown
    }

type PropsType<Props extends VueProps> = {
  [K in keyof Props]: Props[K] extends {
    type: new (...args: any[]) => unknown
  }
    ? InstanceType<Props[K]['type']>
    : Props[K] extends new (...args: any[]) => unknown
    ? InstanceType<Props[K]>
    : never
}

type StyledComponentElements<T extends HTMLElements = HTMLElements> = {
  [K in keyof T]: (
    str: TemplateStringsArray
  ) => Vue.DefineComponent<Vue.HTMLAttributes & T[K]>
}

type StyledComponentElementsByName = {
  <Props extends VueProps = {}, T extends keyof HTMLElements>(
    component: T,
    props?: Props
  ): (
    str: TemplateStringsArray,
    ...placeholders: ((
      props: PropsType<Props>
    ) => string | string | { toString: () => string | string })[]
  ) => Vue.DefineComponent<Vue.HTMLAttributes & HTMLElements[T] & Props>
}

type Component = Vue.Component | Vue.DefineComponent

export type Styled = StyledComponentElements &
  StyledComponentElementsByName & {
    <Props extends VueProps = {}, T extends Component>(
      component: T,
      props?: Props
    ): (
      str: TemplateStringsArray,
      ...placeholders: ((
        props: PropsType<Props>
      ) => string | string | { toString: () => string | string })[]
    ) => Vue.DefineComponent<Props> & T
  }

type HTMLElements = {
  a: Vue.AnchorHTMLAttributes
  abbr: {}
  address: {}
  area: Vue.AreaHTMLAttributes
  article: {}
  aside: {}
  audio: Vue.AudioHTMLAttributes
  b: {}
  base: HTMLBaseElement
  bdi: {}
  bdo: {}
  big: {}
  blockquote: {}
  body: {}
  br: {}
  button: Vue.ButtonHTMLAttributes
  canvas: HTMLCanvasElement
  caption: {}
  cite: {}
  code: {}
  col: Vue.ColHTMLAttributes
  colgroup: Vue.ColgroupHTMLAttributes
  data: Vue.DataHTMLAttributes
  datalist: Vue.DataHTMLAttributes
  dd: {}
  del: {}
  details: {}
  dfn: {}
  dialog: Vue.DialogHTMLAttributes
  div: {}
  dl: {}
  dt: {}
  em: {}
  embed: Vue.EmbedHTMLAttributes
  fieldset: Vue.FieldsetHTMLAttributes
  figcaption: {}
  figure: {}
  footer: {}
  form: Vue.FormHTMLAttributes
  h1: {}
  h2: {}
  h3: {}
  h4: {}
  h5: {}
  h6: {}
  head: {}
  header: {}
  hgroup: {}
  hr: {}
  html: Vue.HtmlHTMLAttributes
  i: {}
  iframe: Vue.IframeHTMLAttributes
  img: Vue.ImgHTMLAttributes
  input: Vue.InputHTMLAttributes
  ins: {}
  kbd: {}
  keygen: {}
  label: Vue.LabelHTMLAttributes
  legend: {}
  li: Vue.LiHTMLAttributes
  link: Vue.LinkHTMLAttributes
  main: {}
  map: Vue.MapHTMLAttributes
  mark: {}
  menu: {}
  menuitem: {}
  meta: Vue.MetaHTMLAttributes
  meter: {}
  nav: {}
  noscript: {}
  object: Vue.ObjectHTMLAttributes
  ol: Vue.OlHTMLAttributes
  optgroup: Vue.OptgroupHTMLAttributes
  option: Vue.OptionHTMLAttributes
  output: {}
  p: {}
  param: Vue.ParamHTMLAttributes
  picture: {}
  pre: {}
  progress: Vue.ProgressHTMLAttributes
  q: Vue.QuoteHTMLAttributes
  rp: {}
  rt: {}
  ruby: {}
  s: {}
  samp: {}
  script: Vue.ScriptHTMLAttributes
  section: {}
  select: Vue.SelectHTMLAttributes
  small: {}
  source: Vue.SourceHTMLAttributes
  span: {}
  strong: {}
  style: Vue.StyleHTMLAttributes
  sub: {}
  summary: {}
  sup: {}
  table: Vue.TableHTMLAttributes
  tbody: {}
  td: Vue.TdHTMLAttributes
  textarea: Vue.TextareaHTMLAttributes
  tfoot: {}
  th: Vue.ThHTMLAttributes
  thead: {}
  time: Vue.TimeHTMLAttributes
  title: {}
  tr: {}
  track: Vue.TrackHTMLAttributes
  u: {}
  ul: {}
  var: {}
  video: Vue.VideoHTMLAttributes
  wbr: {}
}

export const ThemeProvider: Vue.DefineComponent<{ theme: object }>

export const styled: Styled
export default styled
