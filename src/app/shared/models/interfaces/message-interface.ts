import { TypeMessageE } from '../enums/typeMessage-enum';

export interface MessageI {
  type: TypeMessageE;
  message: string;
}
