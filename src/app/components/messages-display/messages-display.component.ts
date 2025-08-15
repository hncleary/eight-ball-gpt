import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
    isTyping?: boolean;
    displayText?: string;
}

@Component({
    selector: 'app-messages-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './messages-display.component.html',
    styleUrl: './messages-display.component.scss',
})
export class MessagesDisplayComponent {
    @Input() messages: Message[] = [];
    @Input() isLoading: boolean = false;
}
