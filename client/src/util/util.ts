import { UserType } from "../models";

export function getOtherUser(user: UserType): UserType {
  return user == UserType.Self ? UserType.Opp : UserType.Self;
}
