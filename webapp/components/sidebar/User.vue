<template>
  <div class="flex h-full items-center justify-center border-gray-300">
    <div class="flex items-center space-x-6">
      <div class="hidden flex-col lg:block">
        <p>Username</p>
        <NuxtLink :to="`/`">
          <p
            class="text-right text-sm text-gray-400 hover:cursor-pointer hover:underline">
            Signout
          </p>
        </NuxtLink>
      </div>
      <SidebarProfilePhoto />
    </div>
  </div>
</template>

<script setup></script>
