import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Staff } from './supabase-table-type';

type userNav = {
    userDetails: Staff | null
    router: AppRouterInstance
}

export type {userNav}