import LessonsList from "@/modules/my-lessons/lessons-list";
import NewLessonForm from "@/modules/my-lessons/new-lesson-form";
import { FC } from "react";
import { cookies } from "next/headers";
import { Lesson } from "@/types/lesson";

const getUserLesson = async () => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const lessons: Lesson[] = [
      {
         lessonId: 1,
         lessonOwner: {
            userId: 1,
            username: "alice123",
            email: "alice@example.com",
            firstName: "Alice",
            lastName: "Johnson",
            dateRegistered: "2023-08-10T02:34:33",
            avatar: 1,
         },
         isPublic: true,
         title: "Introduction to TypeScript",
         description: "A beginner's guide to TypeScript.",
         dateCreated: "2023-08-11T02:34:33",
      },
      {
         lessonId: 2,
         lessonOwner: {
            userId: 2,
            username: "bob456",
            email: "bob@example.com",
            firstName: "Bob",
            lastName: "Smith",
            dateRegistered: "2023-08-09T02:34:33",
            avatar: 2,
         },
         isPublic: false,
         title: "Advanced TypeScript Patterns",
         dateCreated: "2023-08-12T02:34:33",
      },
      {
         lessonId: 3,
         lessonOwner: {
            userId: 3,
            username: "charlie789",
            email: "charlie@example.com",
            firstName: "Charlie",
            lastName: "Brown",
            dateRegistered: "2023-08-08T02:34:33",
            avatar: 3,
         },
         isPublic: true,
         title: "TypeScript and React",
         description: "Integrating TypeScript with React.",
         dateCreated: "2023-08-13T02:34:33",
      },
      {
         lessonId: 4,
         lessonOwner: {
            userId: 4,
            username: "daisy012",
            email: "daisy@example.com",
            firstName: "Daisy",
            lastName: "Miller",
            dateRegistered: "2023-08-07T02:34:33",
            avatar: 4,
         },
         isPublic: false,
         title: "TypeScript Decorators",
         description: "Using decorators in TypeScript.",
         dateCreated: "2023-08-14T02:34:33",
      },
      {
         lessonId: 5,
         lessonOwner: {
            userId: 5,
            username: "edward345",
            email: "edward@example.com",
            firstName: "Edward",
            lastName: "Norton",
            dateRegistered: "2023-08-06T02:34:33",
            avatar: 5,
         },
         isPublic: true,
         title: "TypeScript and Node.js",
         description:
            "Building backend applications with TypeScript and Node.js.",
         dateCreated: "2023-08-15T02:34:33",
      },
      {
         lessonId: 6,
         lessonOwner: {
            userId: 6,
            username: "frank678",
            email: "frank@example.com",
            firstName: "Frank",
            lastName: "Sinatra",
            dateRegistered: "2023-08-05T02:34:33",
            avatar: 6,
         },
         isPublic: false,
         title: "TypeScript Generics",
         description: "Understanding and using generics in TypeScript.",
         dateCreated: "2023-07-03T02:34:33",
      },
      {
         lessonId: 7,
         lessonOwner: {
            userId: 7,
            username: "grace910",
            email: "grace@example.com",
            firstName: "Grace",
            lastName: "Hopper",
            dateRegistered: "2023-08-04T02:34:33",
            avatar: 7,
         },
         isPublic: true,
         title: "TypeScript and Databases",
         description: "Connecting to databases using TypeScript.",
         dateCreated: "2023-05-23T02:34:33",
      },
      {
         lessonId: 8,
         lessonOwner: {
            userId: 8,
            username: "harry112",
            email: "harry@example.com",
            firstName: "Harry",
            lastName: "Potter",
            dateRegistered: "2023-08-03T02:34:33",
            avatar: 8,
         },
         isPublic: false,
         title: "TypeScript and Testing",
         description: "Writing unit tests for TypeScript applications.",
         dateCreated: "2023-06-30T02:34:33",
      },
      {
         lessonId: 9,
         lessonOwner: {
            userId: 9,
            username: "isabel234",
            email: "isabel@example.com",
            firstName: "Isabel",
            lastName: "Allende",
            dateRegistered: "2023-06-04T02:34:33",
            avatar: 9,
         },
         isPublic: true,
         title: "TypeScript Best Practices",
         description: "Tips and tricks for writing clean TypeScript code.",
         dateCreated: "2023-06-12T02:34:33",
      },
      {
         lessonId: 10,
         lessonOwner: {
            userId: 10,
            username: "jack345",
            email: "jack@example.com",
            firstName: "Jack",
            lastName: "Sparrow",
            dateRegistered: "2023-08-01T02:34:33",
            avatar: 10,
         },
         isPublic: false,
         title: "TypeScript and Webpack",
         description: "Bundling TypeScript applications with Webpack.",
         dateCreated: "2023-07-06T02:34:33",
      },
   ];

   //TODO: get data from api
   // const res = await fetch(`${process.env.URL}/api/lesson`, {
   //    headers: { Authorization: `Bearer ${JWT?.value}` },
   // });

   // if (!res.ok) {
   //    throw new Error("Failed to fetch data");
   // }

   // return res.json();

   return new Promise<Lesson[]>((resolve, reject) => {
      setTimeout(() => {
         resolve(lessons);
      }, 300);
   });
};

const MyLessons: FC = async () => {
   const lessons = await getUserLesson();

   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[1fr_3fr]">
         <NewLessonForm />
         <LessonsList lessons={lessons} />
      </div>
   );
};

export default MyLessons;
