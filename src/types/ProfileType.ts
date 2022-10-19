import { Role } from "util/auth";

export type ProfileType = {
  user_name?: string;
  authorities?: Role[];
};
