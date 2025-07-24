import type { EventState, Event} from "@/types";
import { defineStore } from "pinia";
export const useEventStore = defineStore('event', {
    state: (): EventState => ({
        event: null
    }),
    actions: {
        setEvents(event: Event): void {
            this.event = event;
        }
    }
})