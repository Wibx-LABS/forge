export enum AutonomyLevel {
  FULL = 'full',
  PHASE_GATED = 'phase-gated',
  TASK_GATED = 'task-gated',
  MANUAL = 'manual'
}

export interface ForgeConfig {
  forgePath: string;
  defaultAutonomyLevel: AutonomyLevel;
}

export interface PatientData {
  name: string;
  description: string;
  owner: string;
  timeline: string;
  domain?: string;
}
