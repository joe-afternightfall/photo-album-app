import DashboardIcon from '@mui/icons-material/Dashboard';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { StyledComponentProps } from '@mui/styles';
import { ComponentType } from 'react';

import DashboardScreen from '../../components/top-level-components/DashboardScreen';

export const AppPaths = {
  dashboard: '/',
};

export interface PageInfoProps {
  id: string;
  path?: string;
  title: string;
  adminOnly: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
  routerComponent?: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
  breadCrumbs: AppBreadcrumbs[];
}

export interface AppBreadcrumbs {
  order: number;
  title: string;
  routeToPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
}

export type AppRouterInfoMap = {
  [key: string]: PageInfoProps;
  DASHBOARD: PageInfoProps;
};

export const appRoutes: AppRouterInfoMap = {
  DASHBOARD: {
    id: 'dashboard-screen',
    path: AppPaths.dashboard,
    title: 'Dashboard',
    icon: DashboardIcon,
    adminOnly: false,
    routerComponent: DashboardScreen,
    breadCrumbs: [],
  },
};
