import { OpenTriviaDB_Token_Response } from "../interfaces/token-response.interface";

  export function saveToken(token_response: OpenTriviaDB_Token_Response): void {
    sessionStorage.setItem('token', token_response.token);
  }

  export function getSavedToken(key: string): string | null {
    return sessionStorage.getItem(key);
  }
