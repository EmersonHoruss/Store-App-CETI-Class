import { KindMessageEnum } from '../enum/kind-message.enum';

export interface MessageInterface {
  kind: KindMessageEnum;
  title?: string;
  icon?: string;
  content: string;
}
