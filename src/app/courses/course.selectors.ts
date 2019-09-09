import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducers";
import * as fromCourse from './course.reducers';
import * as fromLesson from './lessons.reducers';
import { PageQuery } from "./course.action";
import { selectAll, LessonsState } from "./lessons.reducers";


export const selectCoursesState = createFeatureSelector<CourseState>('course');
export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

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

export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLesson.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {
        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize;

        return allLessons
            .filter(lesson => lesson.courseId === courseId)
            .slice(start, end);
    }
);

export const selectLessonsLoading = createSelector(
    selectLessonsState,
    lessonsState => lessonsState.loading
);
