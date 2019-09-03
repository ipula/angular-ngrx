import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CourseActionTypes, CoureseRequested, CoureseLoaded } from './course.action';
import { mergeMap, map } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$
        .pipe(
            ofType<CoureseRequested>(CourseActionTypes.CoureseRequested),
            mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
            map(course => new CoureseLoaded({course}))
        );

    constructor(private actions$: Actions, private coursesService: CoursesService) {

    }
}
