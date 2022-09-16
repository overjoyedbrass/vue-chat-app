<script setup>
import { ref } from "vue";
import db from "@/firebase/init";
import { addDoc, collection, doc, Timestamp } from "@firebase/firestore";
import { useClientStore } from "@/stores/client";

// eslint-disable-next-line no-undef
const { name, room } = useClientStore();
const newMessage = ref("");

async function createMessage() {
    if (newMessage.value) {
        try {
            await addDoc(collection(db, "messages"), {
                name: name.value,
                message: newMessage.value,
                timestamp: Timestamp.fromDate(new Date()),
                room: doc(db, "rooms", room.value),
            });
            newMessage.value = "";
        } catch (err) {
            console.log(err);
        }
    }
}
</script>
<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage" autocomplete="off">
            <div class="input-group mb-3">
                <input
                    autocomplete="off"
                    type="text"
                    class="form-control"
                    name="message"
                    placeholder="Enter message. . ."
                    v-model="newMessage"
                />
                <button
                    class="btn btn-primary inline"
                    type="submit"
                    name="action"
                >
                    Send
                </button>
            </div>
        </form>
    </div>
</template>
<style></style>
