

export const checkAuth = (req: Request) => {
    const API_KEY = req.headers.get("API_KEY");
    if (API_KEY !== process.env.API_KEY) {
        return false;
    }
    return true;
}