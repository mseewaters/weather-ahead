<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item" >
          <div class="nav-link" @click="handleRouteLinkClick">
            <img class="logo" src="./assets/logo-final-inverted.png" alt="logo" />
            Empowering your outdoor plans.
          </div>
        </li>
        <li class="nav-item" style="margin-left: auto;">
          <div class="nav-link" @click="handleSignOut">
            <span>Sign Out</span>
          </div>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { isTokenValid, signOut } from '@/utils/authService'

const router = useRouter();

function handleRouteLinkClick() {
  const isAuthenticated = isTokenValid();
  console.log("check session", isAuthenticated)
  // After update, navigate based on authentication status
  const routeTo = isAuthenticated.value ? '/' : '/profile';
  router.push(routeTo);
}

function handleSignOut() {
  signOut();
  router.push('/');
}

</script>


<style>

html, body {
  font-family: 'Roboto', Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  color: var(--dkblue);
  background: var(--ltgreen);
}

main {
  width: 100%;
  min-height: 300px;
}

/* Complete for header on all pages, retains fixed height for all resizing */
header {
  background-color: var(--medblue2);
  width: 100%;
  height: var(--fixedheight);
  color: var(--ltyellow);
  box-sizing: border-box;
}
ul {
  padding: 0px;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
}

.logo {
  vertical-align: middle;
  width: 50px;
  margin-right: 20px;
}


</style>
