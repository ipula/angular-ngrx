


import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectCourseById } from "../course.selectors";
import { tap, filter, first } from "rxjs/operators";
import { CoureseRequested } from "../course.action";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        // return this.coursesService.findCourseById(route.params['id']);
        const courseId = +route.params['id'];
        return this.store.pipe(
            select(selectCourseById(courseId)),
            tap(course => {
                if (!course) {
                    console.log(course,courseId);
                    this.store.dispatch(new CoureseRequested({ courseId }));
                }
            }),
            filter(course => !!course),
            first()
        );
    }

}

