import { Principal } from "@dfinity/principal"

export interface User {
  internetIdentity: Principal;
  username: string;
  dob: string;
  nationality: string;
  gender: string;
  email: string;
  balance: number;
  profilePicture: Uint8Array<ArrayBufferLike> | number[];
  faceEncoding?: [] | [Float64Array | number[]];
  role : string
}