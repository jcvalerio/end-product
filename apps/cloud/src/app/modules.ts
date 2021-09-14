interface Module {
  component: JSX.Element;
  path: string;
  priority?: number;
}

interface ModuleToLoad {
  folder: { [key: string]: any };
  modulePath: string;
  priority?: number;
}

export async function getModules(
  modulesToLoad: ModuleToLoad[],
  modulesToIgnore: string[] = [],
): Promise<Module[]> {
  const modules = await Promise.all(
    modulesToLoad.map(async ({ folder, modulePath, priority = 0 }) => {
      const resolvedModules = await Promise.all(
        folder
          .keys()
          .map((moduleRoute: string) => moduleRoute.substr(1))
          .filter((moduleRoute: string) => {
            const [, moduleName] = moduleRoute.split('/');

            return !modulesToIgnore.includes(moduleName);
          })
          .map(async (moduleRoute: string) => {
            const { default: component } = await import(`${modulePath}${moduleRoute}`);
            const parsedModuleRoute = systemRouteToUrlRoute(moduleRoute);

            return { component, path: parsedModuleRoute, priority };
          }),
      );
      return resolvedModules;
    }),
  );

  return modules.reduce((acc, ac) => [...acc, ...ac], []);
}

//#region Private members
function systemRouteToUrlRoute(route: string): string {
  return route.replace('.jsx', '').replace('.tsx', '').replace('/index', '');
}
//#endregion
