import { IconChecklist, IconLayoutDashboard } from '@tabler/icons-react'

import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'hariadiarief',
    email: 'hariadiarief@gmail.com',
    avatar: '/avatars/shadcn.jpg'
  },
  app: {
    name: 'Article Apps',
    logo: Command,
    plan: 'Vite + ShadcnUI'
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard
        },
        {
          title: 'Article',
          url: '/article',
          icon: IconChecklist
        }
      ]
    }
  ]
}
