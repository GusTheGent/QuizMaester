import { Routes } from '@angular/router';
import { RoutePath } from './routes.enum';

export const routes: Routes = [
  {
    path: RoutePath.EMPTY,
    loadComponent: () =>
      import('../pages/wrapper/wrapper.component').then(
        (comp) => comp.WrapperComponent
      ),
    children: [
      {
        path: RoutePath.EMPTY,
        loadComponent: () =>
          import('../pages/home/home.component').then(
            (comp) => comp.HomeComponent
          ),
      },
      {
        path: RoutePath.QUIZ,
        loadComponent: () =>
          import('../pages/quiz/quiz.component').then(
            (comp) => comp.QuizComponent
          ),
      },
      {
        path: RoutePath.EMPTY,
        redirectTo: RoutePath.HOME,
        pathMatch: RoutePath.PATHS_MATCH_FULL,
      },
    ],
  },
  {
    path: RoutePath.ERROR,
    loadComponent: () =>
      import('../pages/error/error.component').then(
        (comp) => comp.ErrorComponent
      )
  },
  {
    path: RoutePath.EMPTY,
    redirectTo: RoutePath.HOME,
    pathMatch: RoutePath.PATHS_MATCH_FULL,
  },
  {
    path: RoutePath.WILDCARD,
    redirectTo: RoutePath.EMPTY,
    pathMatch: RoutePath.PATHS_MATCH_FULL,
  },
];
