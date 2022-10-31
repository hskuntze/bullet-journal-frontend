import { LabelSelect } from "pages/Streaks/Form";

export type StreakType = {
  id: number;
  title: string;
  count: number;
  total: number;
  disabled: boolean;
  doneToday: boolean;
  createdAt: string;
  label: string;
  labelAux: LabelSelect;
};
