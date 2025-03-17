'use server';

import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for user input validation
const SignUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});


// Function to generate a random avatar URL
const getRandomAvatarUrl = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://i.pravatar.cc/150?img=${randomId}`;
};

// Sign-up logic
export const SignUpUser = async (user: z.infer<typeof SignUpSchema>) => {

    try {
        // Validate user input
        const validatedData = SignUpSchema.parse(user);

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(validatedData.password, 10);

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                ...validatedData,
                password: hashedPassword,
                imageUrl: getRandomAvatarUrl(),
            },
        });

        return {
            message: 'User created successfully', user: {
                name: newUser.name,
                email: newUser.email,
                imageUrl: newUser.imageUrl,
                createdAt: newUser.createdAt.toLocaleDateString(),
                updatedAt: newUser.updatedAt.toLocaleDateString(),
                id: newUser.id
            }, status: 201
        };
    } catch (err) {
        // Handle errors
        if (err instanceof z.ZodError) {
            console.log("Zod Error: " + err.message);
            return { message: 'Validation error', errors: err.errors, status: 400 }
        }
        return { message: err instanceof Error ? err.message : 'Something went wrong', status: 500 };
    }
};

// Login logic
// export const LoginUser = async (user: z.infer<typeof LoginSchema>) => {
//     try {
//         // Validate user input
//         const validatedData = LoginSchema.parse(user);

//         // Find the user by email
//         const existingUser = await prisma.user.findUnique({
//             where: { email: validatedData.email },
//         });

//         if (!existingUser) {
//             throw new Error('User not found');
//         }

//         // Compare the password
//         const isPasswordValid = await bcryptjs.compare(
//             validatedData.password,
//             existingUser.password
//         );

//         if (!isPasswordValid) {
//             throw new Error('Invalid password');
//         }

//         // Return success response (you can include a token or session here)
//         return {
//             message: 'Login successful', user: {
//                 name: existingUser.name,
//                 email: existingUser.email,
//                 imageUrl: existingUser.imageUrl,
//                 createdAt: existingUser.createdAt.toLocaleDateString(),
//                 updatedAt: existingUser.updatedAt.toLocaleDateString(),
//                 id: existingUser.id
//             }, status: 200
//         };
//     } catch (err) {
//         // Handle errors
//         if (err instanceof z.ZodError) {
//             return { message: 'Validation error', errors: err.errors, status: 400 }

//         }
//         return { message: err instanceof Error ? err.message : 'Something went wrong', status: 500 };
//     }
// };