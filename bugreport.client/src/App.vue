<template>
  <header>
    <Navbar class="mb-5" />
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
input.border-0{
border-bottom: 1px solid red !important;
background-color: rgb(238, 238, 238);
}
.textdes{
  border: 0ch;
  border-bottom: 1px solid red !important;
background-color: rgb(238, 238, 238);
}
body{
  background: rgb(5, 5, 5) !important;
background: linear-gradient(90deg, rgba(0,0,0,1) 4%, rgba(198,50,50,1) 50%, rgba(0,0,0,1) 96%) !important;
}
</style>
