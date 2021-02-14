export interface Schema {
  /** 專案 */
  project: string;
  /** 使用者名稱 */
  userName: string;
  /** 工作經驗 */
  workExperience: number;
  /** 職位 */
  job: 'Frontend' | 'Backend' | 'Full Stack';
  /** 喜歡的程式語言 */
  programmingLanguages: string[];
  /** 是否在職 */
  isEmployed: boolean;
}
