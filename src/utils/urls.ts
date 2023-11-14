const BASE_PATH = "/";

const REGISTER = "/auth/sign-up";
const LOGIN = "/auth/sign-in";

const DASHBOARD = "/dashboard";
const MY_PROFILE = "/dashboard/my-profile";
const MY_LESSONS = "/dashboard/my-lessons";
const SEARCH = "/dashboard/search";

const LESSON = (lessonName: string, userId: string) =>
   `/dashboard/lesson/${lessonName}/${userId}`;
const EDIT_LESSON = (lessonName: string, userId: string) =>
   `/dashboard/lesson/${lessonName}/${userId}/edit`;

export {
   BASE_PATH,
   REGISTER,
   LOGIN,
   DASHBOARD,
   MY_PROFILE,
   MY_LESSONS,
   SEARCH,
   LESSON,
   EDIT_LESSON,
};
