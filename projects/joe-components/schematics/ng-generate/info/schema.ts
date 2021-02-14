export interface Schema {
  project: string;
  userName: string;
  workExperience: number;
  job: 'Frontend' | 'Backend' | 'Full Stack';
  programmingLanguages: string[];
  isEmployed: boolean;
}
