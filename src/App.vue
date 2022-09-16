<template>
    <router-view />
    <footer>
        <a
            href="https://www.github.com/overjoyedbrass"
            class="btn btn-secondary link btn-sm"
            target="blank"
        >
            github.com/overjoyedbrass
        </a>
    </footer>
</template>

<style>
body {
    background-color: rgb(21, 51, 78);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #184068;
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(21, 51, 78);
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
footer {
    margin: 0.5em 0;
}
.link {
    text-decoration: none;
    color: white;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
