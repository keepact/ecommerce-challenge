import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    path: string;
    logo: string;

    colors: {
      primary: string;
      secundary: string;

      background: string;
      text: string;
    };
  }
}
