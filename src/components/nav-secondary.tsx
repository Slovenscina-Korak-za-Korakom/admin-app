"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={cn(
                    "group relative cursor-pointer rounded-lg transition-all duration-200",
                    "hover:bg-[var(--sidebar-accent-hover)]",
                    isActive && 
                      "bg-[var(--sidebar-accent-active)] text-[var(--sidebar-indicator)] font-medium shadow-sm"
                  )}
                  style={isActive ? {
                    color: 'var(--sidebar-indicator)'
                  } : {}}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon 
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isActive ? "text-[var(--sidebar-indicator)]" : "text-sidebar-foreground/60"
                      )} 
                    />
                    <span className={cn(
                      "flex-1 text-sm transition-colors",
                      isActive ? "text-[var(--sidebar-indicator)]" : "text-sidebar-foreground"
                    )}>{item.title}</span>
                    {isActive && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full shadow-sm"
                        style={{ backgroundColor: 'var(--sidebar-indicator)' }}
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
