export interface RuleSimulationResult {
  ruleId: string;
  action: string;
  params: Record<string, any>;
  wouldExecute: boolean;
}
