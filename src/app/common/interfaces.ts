export interface noticiasInterface {
  endpoints: Endpoints;
  interface: InterfaceApi;
}

export interface Endpoints {
  GetAll: GetAll;
  GetOne: GetOne;
  GetByTitle: GetByTitle;
  Add: Add;
  UpdatePatch: UpdatePatch;
  Delete: Delete;
  GetSections: GetSections;
  GetSection: GetSection;
}

export interface GetAll {
  function: string;
  endpoint: string;
}

export interface GetOne {
  function: string;
  endpoint: string;
}

export interface GetByTitle {
  function: string;
  endpoint: string;
}

export interface Add {
  function: string;
  endpoint: string;
}

export interface UpdatePatch {
  function: string;
  endpoint: string;
}

export interface Delete {
  function: string;
  endpoint: string;
}

export interface GetSections {
  function: string;
  endpoint: string;
}

export interface GetSection {
  function: string;
  endpoint: string;
}

export interface InterfaceApi {
  noticia: Noticia;
  seccion: Seccion;
  comentarios: Comentarios;
}

export interface Noticia {
  _id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  content: string;
  images: string[] | string;
  comment?: Comentarios[];
  comments?: Comentarios[];
  section: Seccion | { name: string; icon?: string } | string;
}

export interface Seccion {
  name: string;
  icon?: string;
}

export interface Comentarios {
  name: string;
  email: string;
  comment: string;
}

export interface Componente {
  nombre: string;
  ruta: string;
  icono: string;
}

