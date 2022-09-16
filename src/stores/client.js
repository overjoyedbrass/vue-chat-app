import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useClientStore = defineStore("client", () => {
    const name = ref("");
    const room = ref("");
    const rooms = reactive([]);

    function setName(newName) {
        if (newName) name.value = newName;
    }
    function setRoom(newRoom) {
        if (newRoom) room.value = newRoom;
    }
    function addRoom(newRoom) {
        if (newRoom) rooms.push(newRoom);
    }
    return { name, room, rooms, setName, setRoom, addRoom };
});
