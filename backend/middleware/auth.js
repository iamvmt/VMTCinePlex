import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }
        const user = await clerkClient.users.getUser(userId);

        if (user.privateMetadata.role !== 'admin') { 
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};