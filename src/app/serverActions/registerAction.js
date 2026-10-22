"use server";

import DBconnection from "../utils/config/db";
import UserModel from "../utils/models/User";

export async function registerAction(registerDetails) {
      try {
        await DBconnection();

        const { username, email, password } = registerDetails;

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return {
                success: false,
                message: "Email already exists"
            };
        }

        // Create new user
        const user = await UserModel.create({
            username,
            email,
            password
        });

        console.log("User Registered:", user);

        return {
            success: true,
            message: "User registered successfully"
        };

    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Registration failed"
        };
    }
}