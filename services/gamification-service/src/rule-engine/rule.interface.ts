export interface Rule {
  id: string;
  trigger: string;
  condition: Record<string, any>;
  action: string;
  params: Record<string, any>;
}
