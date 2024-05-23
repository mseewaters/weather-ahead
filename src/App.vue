<template>
    <header>
      <nav>
        <ul>
          <li class="nav-item" >
            <span>
            <router-link :to="authPath" class="nav-link">
              <img class="logo" src="@/assets/logo-final-inverted.png" alt="logo" />
              Empowering your outdoor plans.
            </router-link>
          </span>
          </li>
          <li  class="nav-item" style="margin-left: auto;">
            <div class="nav-link" @click="handleSignOut" v-if:="isAuth">
              <span>Sign Out</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  <main>
    <router-view/>
  </main>
  <footer>
    <ul class="footer-list">
        <li> 
          <router-link to="data" class="footer-link">Data Privacy</router-link>
          <router-link to="terms" class="footer-link">Terms and Conditions</router-link>
        </li>
    </ul>
  </footer>
</template>

<script setup>
import '@/assets/global.css';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from '@/utils/authService'

const router = useRouter();
const isToken = ref();

function handleSignOut() {
  signOut();
  router.push('/');
}

isToken.value = sessionStorage.getItem('username');
router.beforeEach((to, from, next) => {
  isToken.value = sessionStorage.getItem('username');
  next();
});

const isAuth = computed(() => isToken.value !== null);

const authPath = computed(() => {
  return isAuth.value ? '/profile' : '/';
});

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
  min-height: 200px;
}

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

footer {
  background-color: var(--medblue2);
  width: 100%;
  height: 30px;
  color: var(--ltyellow);
  box-sizing: border-box;

}

.footer-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.footer-link {
  color: var(--ltyellow);
  text-decoration: none;
  margin: 0 50px; /* Add margin to space out the links */
}

.nav-item {
display: inline-block;
padding: 5px 30px 5px 5px;
font-size: 1.5em;
/* border-right: 1px solid var(--ltblue); */
}

.nav-link {
text-decoration: none;
color: inherit;
cursor: pointer; /* Shows a pointer cursor on hover */
}
</style>
