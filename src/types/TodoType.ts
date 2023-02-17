import { PriorityType } from "./PriorityType";
import { UserType } from "./UserType";

export type StreakMinType = {
    id: number;
    title: string;
}

export type TodoType = {
    id: number;
    title: string;
    createdAt: string;
    done: boolean;
    user: UserType;
    priorityAux: PriorityType[];
    priority: string;
    streak: StreakMinType;
}