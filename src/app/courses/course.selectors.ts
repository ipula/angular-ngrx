import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducers";
import * as fromCourse from './course.reducers';


export const selectCoursesState = createFeatureSelector<CourseState>('course');
export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const seleAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
    seleAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    seleAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    seleAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const allCoursesLoaded = createSelector(
    selectCoursesState,
    coursesState => coursesState.allCoursesLoaded
);
