import { Principal } from "@dfinity/principal"

export interface User {
  internetIdentity: Principal;
  username: string;
  dob: string;
  nationality: string;
  gender: string;
  email: string;
  balance: number;
  profilePicture: Uint8Array | number[];
  faceEncoding?: [] | [Float64Array | number[]] | Float64Array[];
  role : string
}