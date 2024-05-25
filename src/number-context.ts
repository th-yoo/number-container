import { createContext } from '@lit/context';

export const numberContext = createContext<number>(Symbol('number-context'));
