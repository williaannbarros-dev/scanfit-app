// Tipos do ScanFit

export type Gender = 'male' | 'female';
export type Goal = 'muscle_gain' | 'fat_loss' | 'body_recomp' | 'performance';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserPhotos {
  front: string;
  back: string;
  sideRight: string;
  sideLeft: string;
}

export interface UserData {
  gender: Gender;
  age: number;
  weight: number; // kg
  height: number; // cm
  goal: Goal;
  fitnessLevel?: FitnessLevel;
  weeklyWorkouts?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arm?: number;
    thigh?: number;
    calf?: number;
  };
}

export interface BodyAnalysis {
  bodyFatPercentage: number;
  bmi: number;
  bodyType: string;
  muscleMassEstimate: string;
  recommendations: string[];
  detailedAnalysis: string;
}

export interface UserProfile {
  id: string;
  photos: UserPhotos;
  data: UserData;
  analysis: BodyAnalysis;
  createdAt: Date;
}
