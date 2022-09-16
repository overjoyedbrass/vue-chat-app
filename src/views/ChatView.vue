<script setup>
import { reactive, onUnmounted, onUpdated, onMounted, ref } from "vue";
import CreateMessage from "@/components/CreateMessage";
import db from "@/firebase/init";
import {
    collection,
    onSnapshot,
    where,
    query,
    limit,
    doc,
    setDoc,
} from "@firebase/firestore";
import { format } from "date-fns";
import { useClientStore } from "@/stores/client";
import router from "@/router";

const messages = reactive([]);
const { name, room, rooms } = useClientStore();

const localRoom = ref(room.value);
const unsubscribe = ref(() => {});

if (!name.value) {
    router.push({ name: "login" });
}

function subscribe(newRoom) {
    if (!newRoom) return;
    messages.splice(0);
    unsubscribe.value();
    const q = query(
        collection(db, "messages"),
        where("room", "==", doc(db, "rooms", newRoom)),
        limit(10)
    );
    unsubscribe.value = onSnapshot(q, (snapshot) => {
        snapshot
            .docChanges()
            .reverse()
            .forEach((change) => {
                if (change.type === "added") {
                    let doc = change.doc;
                    messages.push({
                        name: doc.data().name,
                        message: doc.data().message,
                        timestamp: doc.data().timestamp.toDate(),
                    });
                }
            });
        messages.sort((a, b) => a.timestamp - b.timestamp);
    });
}

function isMyMessage(message) {
    return message.name === name.value;
}

function changeRoom(newRoom) {
    localRoom.value = newRoom;
    subscribe(newRoom);
}

onUpdated(() => {
    const div = document.getElementById("messages");
    div.scroll({
        top: div.scrollHeight,
        behavior: "smooth",
    });
});

onMounted(() => {
    if (room.value) {
        const newDoc = doc(db, "rooms", room.value);
        setDoc(newDoc, {});
        subscribe(room.value);
    }
});

onUnmounted(async () => unsubscribe.value());
</script>

<template>
    <div class="container mt-1" style="max-width: 600px">
        <h2 class="text-warning text-center">Real-Time chat</h2>
        <h5 class="text-secondary text-center">
            <span style="color: white">Room id:</span>&nbsp;
            <span class="text-info">{{ localRoom }}</span>
        </h5>
        <div class="card">
            <div class="card-body">
                <p
                    class="text-secondary nomessages"
                    v-if="messages.length === 0"
                >
                    [No messages yet!]
                </p>
                <div class="messages" id="messages">
                    <div
                        v-for="message in messages"
                        :key="message.id"
                        class="chat"
                    >
                        <span class="text you" v-if="isMyMessage(message)">
                            [You]:
                        </span>
                        <span v-else class="text-info"
                            >[{{ message.name }}]:
                        </span>
                        <span class="message">{{ message.message }}</span>
                        <br />
                        <span class="text-secondary time">{{
                            format(message.timestamp, "h:mm a")
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <CreateMessage />
            </div>
            <div class="container rooms">
                <b>Available rooms</b><br />
                <button
                    v-for="room in rooms"
                    :key="room.id"
                    @click="() => changeRoom(room.id)"
                    class="btn btn-outline-secondary m-1"
                    :id="room.id"
                >
                    {{ room.id }}
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.chat {
    margin-bottom: 1em;
}
.chat h2 {
    font-size: 2.6em;
    margin-bottom: 0px;
}

.chat h5 {
    margin-top: 0px;
    margin-bottom: 40px;
}

.chat span {
    font-size: 1.2em;
}

.chat .time {
    display: block;
    font-size: 0.7em;
}

.messages {
    max-height: 300px;
    overflow: auto;
    text-align: left;
}

@media only screen and (max-width: 600px) {
    .messages {
        max-height: 200px;
    }
}

.message {
    color: black;
}

.you {
    color: blue;
}
</style>
