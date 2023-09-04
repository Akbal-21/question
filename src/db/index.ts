import { PrismaClient } from "@prisma/client";

declare global {
	// rome-ignore lint/style/noVar: <explanation>
	var prisma: PrismaClient | undefined;
}

// rome-ignore lint/suspicious/noRedeclare: <explanation>
export const prisma = global.prisma || new PrismaClient();

if (process.env.NOVE !== "production") {
	global.prisma = prisma;
}
