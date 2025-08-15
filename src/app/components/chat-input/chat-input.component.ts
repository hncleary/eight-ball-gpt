import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-input.component.html',
    styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
    @Output() sendMessage = new EventEmitter<string>();
    @Input() isLoading: boolean = false;

    @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

    protected newMessage: string = '';

    protected onSendMessage() {
        if (this.newMessage.trim() && !this.isLoading) {
            this.sendMessage.emit(this.newMessage);
            this.newMessage = '';
            this.autoResize();
        }
    }

    protected onKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.onSendMessage();
        }
    }

    protected autoResize() {
        if (this.messageInput) {
            const textarea = this.messageInput.nativeElement;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}
