import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CourseActionTypes, CoureseRequested, CoureseLoaded, AllCoursesLoaded, AllCoursesRequested } from './course.action';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { allCoursesLoaded } from './course.selectors';

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$
        .pipe(
            ofType<CoureseRequested>(CourseActionTypes.CoureseRequested),
            mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
            map(course => new CoureseLoaded({ course }))
        );

    @Effect()
    loadAllCourse$ = this.actions$
        .pipe(
            ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
            withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
            filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
            mergeMap(() => this.coursesService.findAllCourses()),
            map(course => new AllCoursesLoaded({ course }))
        );

    constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {

    }
}
