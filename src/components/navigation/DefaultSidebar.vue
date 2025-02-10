<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader class="bg-white dark:bg-neutral-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <div class="flex items-center space-x-2">
              <img :src="logo" class="w-7" alt="logo"/>
              <p class="font-black text-lg">DAGOBAH <span class="text-primary font-black text-lg">TASK</span></p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator/>
      <SidebarContent class="bg-white dark:bg-neutral-950">
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
                v-for="item in linksData"
                :key="item.title"
                :default-open="item.isActive"
                as-child
                class="group/collapsible"
            >
              <SidebarMenuItem v-if="item.items.length === 0"
                               class="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <RouterLink
                    :to="item.to || ''"
                >
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="item.title">
                      <Icon :icon="item.icon"/>
                      <span>{{ item.title }}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </RouterLink>
              </SidebarMenuItem>
              <SidebarMenuItem v-else>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title"
                                     class="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                    <Icon :icon="item.icon"/>
                    <span>{{ item.title }}</span>
                    <ChevronRight
                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>

                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                        v-for="subItem in item.items"
                        :key="subItem.title"
                        class="hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg"
                    >
                      <RouterLink
                          :to="subItem.to"
                      >
                        <SidebarMenuSubButton as-child>
                          <span>{{ subItem.title }}</span>
                        </SidebarMenuSubButton>
                      </RouterLink>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator/>
      <SidebarFooter class="bg-white dark:bg-neutral-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    size="lg"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarFallback class="rounded-lg uppercase">
                      {{ user.username.substring(0, 2)}}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold capitalize">{{ user.username}}</span>
                    <span class="truncate text-xs">{{ user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent :side-offset="4" align="end"
                                   class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarFallback class="rounded-lg uppercase">
                        {{ user.username.substring(0, 2)}}
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold capitalize">{{ user.username }}</span>
                      <span class="truncate text-xs">{{ user.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer" @click="router.push({name: 'Setting'})">
                    <Settings/>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer" @click="onDarkMode">
                    <SunMoon/>
                    Change color
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem class="cursor-pointer" @click="handleLogout">
                  <LogOut/>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
    <SidebarInset>
      <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1"/>
          <Separator class="mr-2 h-4" orientation="vertical"/>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem
                  v-for="(crumb, index) in breadcrumbs"
                  :key="index"
                  class="hidden md:flex items-center space-x-2"
              >
                <BreadcrumbLink
                    v-if="crumb.path"
                    :href="crumb.path"
                >
                  {{ crumb.label }}
                </BreadcrumbLink>
                <BreadcrumbPage v-else>
                  {{ crumb.label }}
                </BreadcrumbPage>
                <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" class="hidden md:block"/>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <slot/>
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang=ts setup>
import {computed, onMounted, ref} from 'vue'
import {Avatar, AvatarFallback,} from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Separator} from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {ChevronRight, ChevronsUpDown, ExternalLink, LogOut, SunMoon, Settings} from 'lucide-vue-next'
import {useRoute} from 'vue-router';

import {linksData, modulesData} from '@/data/navigation.data.ts';
import {Icon} from "@iconify/vue";
import {Module} from "@/interface/navigation.interface.ts";
import {useColorMode} from '@vueuse/core'
import {useSecurityStore} from '@/store/auth.ts';
import {useRouter} from 'vue-router'
import {jwtDecode} from "jwt-decode";

import logo from '../../../public/logo.svg'

const route = useRoute();
const router = useRouter()
let mode = useColorMode()
const authStore = useSecurityStore();
const user = ref({
  username: '',
  email: '',
})

const activeModule = ref(modulesData[0])

const breadcrumbs = computed(() => {
  return route.matched.map((r, index) => ({
    label: r.meta.breadcrumb || r.name,
    path: index < route.matched.length - 1 ? r.path : null,
  }));
});

const handleLogout = () => {
  useSecurityStore().logout()
  window.location.assign('/');
}

const onDarkMode = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  mode.value === 'light' ? mode.value = 'dark' : mode.value = 'light'
}

const openModule = (module: Module) => {
  window.open(module.url, '_blank');
}

const openDashboard = () => {
  const dashboardUrl = import.meta.env.VITE_URL_DASHBOARD_CORTEX;
  window.open(dashboardUrl, '_blank');
}

onMounted(() => {
  user.value = jwtDecode(authStore.getToken || '')
})
</script>
