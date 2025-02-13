import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { fetchRoutes } from "./mock/api";

// Fetch routes from the mock API
fetchRoutes()
  .then((response: any) => {
    const routes = constructRoutes(response.data); // Use the fetched routes
    console.log(routes);

    const applications = constructApplications({
      routes,
      loadApp({ name }) {
        return import(/* webpackIgnore: true */ name);
      },
    });

    const layoutEngine = constructLayoutEngine({ routes, applications });

    applications.forEach(registerApplication);

    // import(/* webpackIgnore: true */ "@euroland/shadcn-ui-styleguide").then(
    //   () => {
    // Activate the layout engine once the styleguide CSS is loaded
    layoutEngine.activate();
    start();
    //   }
    // );
  })
  .catch((error) => {
    console.error("Error fetching routes:", error);
  });
