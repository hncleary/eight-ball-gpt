import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    messages: Message[] = [];
    newMessage: string = '';
    isLoading: boolean = false;

    // Magic 8-ball responses
    private _magic8BallResponses = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes, definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    sendMessage() {
        if (this.newMessage.trim()) {
            // Add user message
            this.messages.push({
                text: this.newMessage,
                isUser: true,
                timestamp: new Date()
            });

            this.newMessage = '';
            this.isLoading = true;

            // Simulate AI thinking time
            setTimeout(() => {
                const response = this.getMagic8BallResponse();
                this.messages.push({
                    text: response,
                    isUser: false,
                    timestamp: new Date()
                });
                this.isLoading = false;
            }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
        }
    }

    private getMagic8BallResponse(): string {
        const randomIndex = Math.floor(
            Math.random() * this._magic8BallResponses.length
        );
        return this._magic8BallResponses[randomIndex];
    }

    protected onKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    protected autoResize(textarea: HTMLTextAreaElement) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}
