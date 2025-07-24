import type { MessageState } from '@/types';
import { defineStore } from 'pinia';
export const useMessageStore = defineStore('message', {
    state: (): MessageState => ({
        messages: ''
    }),
    actions: {
        updateMessages(message: string): void {
            this.messages = message;
        },
        resetMessages(): void {
            this.messages = '';
        }
    }
}) 