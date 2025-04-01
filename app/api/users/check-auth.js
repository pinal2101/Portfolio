import { getSession } from "next-auth/client";  

export default async (req, res) => {
  try {
    // Get the session data (you can modify this if using JWT or other auth methods)
    const session = await   getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    return res.status(200).json({ message: "Authenticated", user: session.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
