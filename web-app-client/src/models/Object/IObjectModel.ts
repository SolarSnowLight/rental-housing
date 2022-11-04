/**
 * Интерфейс для описания координат города
 */
export interface ICityCoords {
  lat: string;
  lon: string;
}

/**
 * Интерфейс для описание города, в котором находится объект
 */
export interface ICity {
  coords: ICityCoords;
  district: string;
  name: string;
  population: number;
  subject: string;
}

/**
 * Интерфейс для описание координат объекта
 */
export interface IObjectCoords {
  city: ICity;
  lat: number;
  lng: number;
}

/**
 * Интерфейс для описание токена в шаблоне таблицы
 */
export interface ITokenTableModel {
  value: string;
  type_component: string;
  position: string;
}

/**
 * Интерфейс для описание информации об объекте
 */
export interface IObjectModel {
  title: string;
  date_delivery: Date;
  images: string[];
  characteristics: string[];
  payment_methods: string[];
  communications: string[];
  coords: IObjectCoords;
  tokens: ITokenTableModel[][];
  file: string;
}
