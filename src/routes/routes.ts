import { UserRoutes } from '@routes/user.routes';
import { ServerRoute } from '@hapi/hapi';
import { AuthRoutes } from '@routes/auth.routes';

export const Routes: ServerRoute[] = [...AuthRoutes, ...UserRoutes];
