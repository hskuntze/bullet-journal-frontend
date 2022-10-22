import { PriorityType } from "./PriorityType";

export type TodoFilterContent = {
    title: string;
    priority: string;
    priorityAux?: PriorityType[];
}