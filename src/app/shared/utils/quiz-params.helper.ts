import { HttpParams } from '@angular/common/http';
import { SettingsForm } from '../interfaces/settings-form.interface';

export function createQuizParams(settingsForm: SettingsForm): HttpParams {
  let params = new HttpParams();
  console.log(settingsForm);
  for (const key in settingsForm) {
    if (settingsForm.hasOwnProperty(key)) {
      const value = settingsForm[key as keyof SettingsForm];
      switch (key) {
        case 'amount':
        case 'encode':
          params = params.append(key, value);
          break;
        case 'category':
          if (value !== 'Any Category') {
            params = params.append(key, value);
          }
          break;
        case 'difficulty':
          const difficultyMap: { [key: string]: string } = {
            Easy: 'easy',
            Medium: 'medium',
            Hard: 'hard',
          };
          if (difficultyMap[value]) {
            params = params.append(key, difficultyMap[value]);
          }
          break;
        case 'type':
          const typeMap: { [key: string]: string } = {
            'Multiple Choice': 'multiple',
            'True / False': 'boolean',
          };
          if (typeMap[value]) {
            params = params.append(key, typeMap[value]);
          }
          break;
        default:
          break;
      }
    }
  }
  return params;
}
