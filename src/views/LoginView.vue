<script setup>
import { useClientStore } from "@/stores/client";
import { onUnmounted, ref, watch } from "vue";
import router from "@/router/index";
import db from "@/firebase/init";
import { query, onSnapshot, collection } from "@firebase/firestore";

const errorText = ref("");
const newName = ref("");
const newRoom = ref("");

const { setName, setRoom, rooms } = useClientStore();

function setNewRoom(id) {
    newRoom.value = id;
}

function login() {
    if (newName.value !== "") {
        setName(newName);
    } else {
        errorText.value = "Please provide a name!";
        return;
    }
    if (newRoom.value !== "") {
        setRoom(newRoom);
    } else {
        errorText.value = "Room cannot be empty";
        return;
    }
    if (newRoom.value && newName.value) {
        router.replace({ name: "chat" });
    }
}

const q = query(collection(db, "rooms"));
const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot
        .docChanges()
        .reverse()
        .forEach((change) => {
            if (change.type === "added") {
                let doc = change.doc;
                rooms.push({
                    id: doc.id,
                });
            }
        });
});

watch(newName, () => (errorText.value = ""));
watch(newRoom, () => {
    errorText.value = "";
    newRoom.value = newRoom.value.replaceAll(" ", "");
});
onUnmounted(() => unsubscribe());
</script>

<template>
    <div class="container">
        <div class="card login">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Enter the chat</h2>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Name: </span>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your nickname"
                            v-model="newName"
                        />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Room: </span>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter room id"
                            v-model="newRoom"
                        />
                    </div>
                    <b>Available rooms</b><br />
                    <div class="container rooms">
                        <button
                            v-for="room in rooms"
                            :key="room.id"
                            class="btn room btn-outline-secondary btn-sm"
                            @click="() => setNewRoom(room.id)"
                        >
                            {{ room.id }}
                        </button>
                    </div>
                    <p v-if="errorText" class="text-danger">
                        {{ errorText }}
                    </p>
                </div>
                <button class="btn btn-primary" @click="login">
                    Enter chat
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.login {
    max-width: 450px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
input:focus::placeholder {
    color: transparent;
}
.rooms {
    padding: 1em;
    border-radius: 5px;
}
.room {
    margin: 0.25em;
}
</style>
