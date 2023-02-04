export type UserJWT = {
  id: string;
}

export interface JwtProvider {
  sign: (paylod: UserJWT) => Promise<string>;
}