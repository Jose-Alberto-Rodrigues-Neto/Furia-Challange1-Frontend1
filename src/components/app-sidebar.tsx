import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar } from "./ui/avatar"
import Image from "next/image"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Converse com",
      items: [
        {
          title: "ChatBot Furia",
          avatar: "https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png"
        },
        {
          title: "FalleN",
          avatar: "https://profilerr.net/static/content/thumbs/335x335/c/55/3pgxe6---c1x1x200px0p-rc--2bfc3455d0b32854a3b0f446ca9f555c.png"
        },
      ],
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  chat: string;
  setChat: (chat: string) => void;
}

export function AppSidebar({ chat, setChat, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1>Chat Furia</h1>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className={chat === item.title? `bg-sidebar-accent p-2 w-full h-full cursor-pointer`: `p-2 w-full h-full cursor-pointer`} asChild onClick={()=>{
                      setChat(item.title)
                    }}>
                        <div className="flex flex-row">
                          <Avatar>
                            <Image src={item.avatar} alt={item.title} width={200} height={200} className="object-contain"/>
                          </Avatar>
                          {item.title}
                        </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
