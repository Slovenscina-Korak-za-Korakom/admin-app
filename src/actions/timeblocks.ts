/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/db";
import {schedulesTable} from "@/db/schema";
import {auth, clerkClient} from "@clerk/nextjs/server";

export const createSchedule = async (data: any) => {
  const {userId} = await auth();
  if (!userId) {
    return {success: false, error: "Unauthorized"};
  }

  if (!data) {
    return {success: false, error: "No data provided"};
  }

  const submitData = {
    ownerId: userId,
    schedule: data,
  };

  try {
    await db.insert(schedulesTable).values(submitData);
    return {success: true, message: "Schedule created successfully"};
  } catch (error) {
    console.error(error);
    return {success: false, message: "Failed to create schedule"};
  }
};

export const getStudentInfo = async (studentId: string) => {
  const {userId} = await auth();
  const client = await clerkClient();
  if (!userId) {
    return {message: "Unauthorized", status: 401};
  }
  const user = await client.users.getUser(studentId);

  if (!user) {
    return {message: "User not found", status: 404};
  }
  return {
    user: {
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      image: user.imageUrl,
    },
    status: 200
  }

}
