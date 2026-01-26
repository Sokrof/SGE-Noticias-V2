export interface Root {
  endpoints: Endpoints
  interface: Interface
}

export interface Endpoints {
  GetAll: GetAll
  GetOne: GetOne
  GetByTitle: GetByTitle
  Add: Add
  UpdatePatch: UpdatePatch
  Delete: Delete
  GetSections: GetSections
  GetSection: GetSection
}

export interface GetAll {
  function: string
  endpoint: string
}

export interface GetOne {
  function: string
  endpoint: string
}

export interface GetByTitle {
  function: string
  endpoint: string
}

export interface Add {
  function: string
  endpoint: string
}

export interface UpdatePatch {
  function: string
  endpoint: string
}

export interface Delete {
  function: string
  endpoint: string
}

export interface GetSections {
  function: string
  endpoint: string
}

export interface GetSection {
  function: string
  endpoint: string
}

export interface Interface {
  noticia: Noticia
  seccion: Seccion
  comentarios: Comentarios
}

export interface Noticia {
  _id: string
  title: string
  subtitle: string
  author: string
  date: string
  content: string
  images: string
  comment: string
  section: string
}

export interface Seccion {
  name: string
  icon: string
}

export interface Comentarios {
  name: string
  email: string
  comment: string
}
