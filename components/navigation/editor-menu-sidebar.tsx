'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Edit, HomeIcon, SettingsIcon, TerminalIcon } from 'lucide-react'

import { SidebarHeaderToLogo } from '@/components/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
        icon: HomeIcon,
    },
    {
        title: 'Edit',
        url: '/edit',
        icon: Edit,
    },
    {
        title: 'Template',
        url: '/edit/template',
        icon: TerminalIcon,
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: SettingsIcon,
    },
]

export const EditorMenuSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar className="w-64 border-r bg-background" collapsible="icon">
            <SidebarHeaderToLogo />
            <SidebarContent className="mt-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            asChild
                                        >
                                            <Link
                                                href={item.url}
                                                className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent/50 ${
                                                    isActive
                                                        ? 'bg-accent font-medium text-lime-500'
                                                        : 'text-muted-foreground'
                                                }`}
                                            >
                                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                                <span className="text-sm">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <div className="flex justify-end">
                    <SidebarTrigger className="hover:bg-accent rounded p-2" />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
