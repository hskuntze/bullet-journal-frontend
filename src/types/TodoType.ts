import { PriorityType } from "./PriorityType";
import { StreakType } from "./StreakType";
import { UserType } from "./UserType";

export type TodoType = {
    id: number;
    title: string;
    createdAt: string;
    done: boolean;
    user: UserType;
    priorityAux: PriorityType[];
    priority: string;
    streak: StreakType;
}