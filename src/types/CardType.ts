import { UserType } from "./UserType";

export type CardType = {
    id: number;
    title: string;
    description: string;
    user: UserType;
};