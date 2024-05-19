<template>
  <div class="main-container">
    <div class="left-side">
      <p>Personalized notifications </p>
      <p>that keep you informed </p>
      <p>of weather events</p>
      <p>that impact <u>you</u>.</p>
    </div>
    <div class="vertical-line"></div>
    <div class="right-side" >
        <div>
          <nav>
            <ul>
              <li class="comp-item" >
                    <router-link to="/signin" >SIGN IN</router-link>
              </li>
              <li class="comp-item" >
                    <router-link to="/register" >SIGN UP</router-link>
              </li>
              <li class="comp-item" >
                    <router-link to="/verify" >VERIFY</router-link>
              </li>
            </ul>
          </nav>
          <router-view/> <!-- This will render the active child component -->
          <br>
          <br>
          <div style="text-align: center;">
              <img src="../assets/logo-final-inverted.png" alt="Logo" width=50% height=auto>
          </div>
        </div>
    </div>      
  </div>
</template>

<script setup>


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-container {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    min-height: 100vh; /* 100% of viewport height */
    /* overflow-x: hidden; */
}
.left-side {
    flex: 1; /* Takes remaining space */
    background-color: var(--ltblue2); /* Just for visualization */
    padding: 0px 0px; /* Optional: Add some padding */
    text-align: center;
    line-height: 0.4;   
    font-size: 64px; 
    font-weight: 700; 
    font-style: italic;
    box-sizing: border-box;
}
.vertical-line {
    width: 2px;
    background-color: var(--medblue2); /* Color of the line */
    box-shadow: -2px 0px 5px var(--medblue2);
    box-sizing: border-box;
}
.right-side {
    width: 500px; /* 20% width */
    display: flex;
    background-color: var(--ltyellow); /* Just for visualization */
    padding: 20px 30px; /* Optional: Add some padding */
    box-sizing: border-box;
    
}

ul {
  display: flex; /* Enables Flexbox */
  justify-content: space-between; /* Distributes space evenly between items */
  padding: 0; /* Removes default padding */
  list-style: none; /* Removes default list style */
}

.comp-item {
  flex: 1; /* Gives each list item an equal ability to grow */
  text-align: center; /* Centers text within each list item */
  display: inline-block;
  padding: 5px;
  color: var(--dkblue);
  background-color: var(--ltyellow);
  font-size: 0.9em;
  font-weight:bolder;
}

.comp-item:not(:last-child) {
  border-right: 1px solid var(--medblue); /* Adjust the border style and color as needed */
}
</style>
