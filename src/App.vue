<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'home'}">
            <img class="logo" src="./assets/logo-final-inverted.png" alt="logo" />
            Empowering your outdoor plans.
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style>

@import './assets/variables.css';

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
}
ul {
  padding: 2px 10px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 40px 5px 5px;;
  font-size: 1.5em;
  border-right: 1px solid var(--ltblue);
}
.nav-link {
  text-decoration: none;
  color: inherit;
}

.logo {
  vertical-align: middle;
  width: 50px;
  margin-right: 20px;
}

</style>
