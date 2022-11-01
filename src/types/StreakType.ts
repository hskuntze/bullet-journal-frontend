import { LabelSelect } from "pages/Streaks/Form";

export type StreakType = {
  id: number;
  title: string;
  count: number;
  total: number;
  disabled: boolean;
  totalPerLabel: number;
  createdAt: string;
  label: string;
  labelAux: LabelSelect;
  last: string;
};
