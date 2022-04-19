import { GeneralApiProblem } from './api-problem';
// import { Character } from "../../models/character/character"
// import { Zone } from "../../models/zone/zone"
// import { AccountSnapshot } from "../../models"

export interface User {
  id: number;
  name: string;
}

export type BaseResult<T = any> = {
  status: boolean;
  code: number;
  message: string;
  data: T;
};

export type GetUsersResult = { kind: 'ok'; users: User[] } | GeneralApiProblem;
export type GetUserResult = { kind: 'ok'; user: User } | GeneralApiProblem;

// export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
// export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
// export type GetZones = { kind: "ok"; data: Zone[] } | GeneralApiProblem
// export type GetAccount = { kind: "ok"; data: BaseResult<AccountSnapshot> } | GeneralApiProblem
