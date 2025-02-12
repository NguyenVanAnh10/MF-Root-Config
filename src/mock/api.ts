import routes from "./routes.json";

const mockApiResponse = {
  success: true,
  data: {
    routes: routes.routes,
  },
  message: "Routes fetched successfully",
};

// Example function to simulate API call
export function fetchRoutes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiResponse);
    }, 1000); // Simulate network delay
  });
}
