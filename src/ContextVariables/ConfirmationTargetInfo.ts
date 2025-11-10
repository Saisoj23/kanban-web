export interface ConfirmationTargetInfo {
  content: string;
  target: string | number;
  column?: string;
  rename?: boolean;
  confirmCallback: (target: string | number, targetNewName?: string) => {};
}
