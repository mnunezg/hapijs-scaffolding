import { UserRoutes } from "@routes/user.routes";
import { ServerRoute } from "@hapi/hapi";

export const Routes: ServerRoute[] = [
  ...UserRoutes
]
