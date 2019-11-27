import { BaseInterface } from './BaseInterface';

export interface IResponse {
  result: boolean,
  message?: string,
  code?: string,
  model?: BaseInterface,
  jsonData?: any,
}