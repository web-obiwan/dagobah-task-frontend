<template>
  <div class="flex justify-center items-center w-full h-screen">
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
      </CardDescription>
    </CardHeader>
    <form @submit.prevent="handleLogin">
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
              id="email"
              v-model="formData.username"
              type="email"
              placeholder="m@example.com"
              required
              :disabled="isLoading"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
              id="password"
              v-model="formData.password"
              type="password"
              required
              :disabled="isLoading"
          />
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </Button>
      </CardFooter>
    </form>
  </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSecurityStore } from '@/store/auth.ts';
import {LoginData} from "@/interface/response.auth.interface.ts";

const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const formData = ref({
  username: '',
  password: ''
})

async function handleLogin() {
  if (isLoading.value) return

  error.value = ''
  isLoading.value = true

  try {
    const loginData: LoginData = {
      username: formData.value.username,
      password: formData.value.password
    }

    const success = await useSecurityStore().login(loginData)

    if (success) {
      await router.push('/')
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (e) {
    error.value = 'An error occurred during login. Please try again.'
    console.error('Login error:', e)
  } finally {
    isLoading.value = false
  }
}
</script>