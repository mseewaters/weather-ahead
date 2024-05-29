<template>
  <div class="main-container">
    <div class="left-side">
      <span style="font-size: 4vw; font-weight: bolder; line-height: 1.8;">Personalized notifications that keep you informed of weather events that impact <u>you</u></span>
      <div style="font-size: 2vw; font-weight: normal; text-align: left; line-height: 1.0; margin-left: 5vw">
        <p>YOUR location</p>
        <p>YOUR notification schedule</p>
        <p>YOUR outdoor events </p>
        <ul class="event-list">
          <li><b>Currently available standard events:</b> Freeze (min temp &lt; 33F), Running (max temp &gt; 50F, change of rain &lt; 75%)</li>
          <li><b>Upcoming standard events:</b>  Water plants, weekend outdoor grilling</li>
          <li><span style="color: red; font-weight: bold">[COMING SOON]</span> Choose and customize your events</li>
        </ul>
      </div>
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

header {
  background-color: var(--medblue2);
  width: 100%;
  height: var(--fixedheight);
  color: var(--ltyellow);
  box-sizing: border-box;
}

.event-list {
  display:block;
  list-style: disc;
  margin-left: 50px;
  font-size: 1vw;
  line-height: 2;

}

.logo {
  vertical-align: middle;
  width: 50px;
  margin-right: 20px;
}

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
    padding: 0px 50px; /* Optional: Add some padding */
    text-align: center;
    line-height: 2;   
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

.nav-item {
  display: inline-block;
  padding: 5px 30px 5px 5px;
  font-size: 1.5em;
  text-decoration: none;
  /* border-right: 1px solid var(--ltblue); */
}

.nav-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer; /* Shows a pointer cursor on hover */
}
</style>
