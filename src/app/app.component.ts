import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {
    MessagesDisplayComponent,
    Message,
} from './components/messages-display/messages-display.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { TypingAnimationService } from './services/typing-animation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        MessagesDisplayComponent,
        ChatInputComponent,
        InfoModalComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    protected messages: Message[] = [];
    protected isLoading: boolean = false;
    protected showInfoModal: boolean = false;
    private typingSubscription?: Subscription;

    constructor(private typingService: TypingAnimationService) {}

    ngOnDestroy() {
        if (this.typingSubscription) {
            this.typingSubscription.unsubscribe();
        }
    }

    // Magic 8-ball responses
    private readonly _magic8BallResponses = [
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
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.',
    ];

    protected sendMessage(messageText: string) {
        if (messageText.trim()) {
            // Add user message
            this.messages.push({
                text: messageText,
                isUser: true,
                timestamp: new Date(),
                displayText: messageText, // User messages show immediately
            });

            this.isLoading = true;

            // Simulate AI thinking time
            setTimeout(
                () => {
                    const response = this.getMagic8BallResponse();
                    const botMessage: Message = {
                        text: response,
                        isUser: false,
                        timestamp: new Date(),
                        isTyping: true,
                        displayText: '',
                    };

                    this.messages.push(botMessage);
                    this.isLoading = false;

                    // Start typing animation
                    this.startTypingAnimation(botMessage);
                },
                1000 + Math.random() * 2000
            ); // Random delay between 1-3 seconds
        }
    }

    private startTypingAnimation(message: Message) {
        // Clean up any existing subscription
        if (this.typingSubscription) {
            this.typingSubscription.unsubscribe();
        }

        // Start the typing animation with variable speed
        this.typingSubscription = this.typingService
            .typeTextWithVariableSpeed(message.text, 60)
            .subscribe(displayText => {
                message.displayText = displayText;
                if (displayText === message.text) {
                    message.isTyping = false;
                }
            });
    }

    private getMagic8BallResponse(): string {
        const randomIndex = Math.floor(Math.random() * this._magic8BallResponses.length);
        return this._magic8BallResponses[randomIndex];
    }

    protected openInfoModal() {
        this.showInfoModal = true;
    }

    protected closeInfoModal() {
        this.showInfoModal = false;
    }

    protected onModelChange(modelId: string) {
        // Here you would typically make an API call to switch models
        console.log('Model changed to:', modelId);
        // For now, we'll just log the change
        // In a real implementation, you might want to:
        // - Update the API endpoint
        // - Clear the conversation
        // - Show a notification
    }
}
