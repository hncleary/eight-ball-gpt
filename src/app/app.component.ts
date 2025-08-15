import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypingAnimationService } from './services/typing-animation.service';
import { Subscription } from 'rxjs';

export interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
    isTyping?: boolean;
    displayText?: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
    protected messages: Message[] = [];
    protected newMessage: string = '';
    protected isLoading: boolean = false;
    protected showInfoModal: boolean = false;
    protected showModelPopup: boolean = false;
    protected selectedModel: string = '8GPT';
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
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    protected sendMessage() {
        if (this.newMessage.trim()) {
            // Add user message
            this.messages.push({
                text: this.newMessage,
                isUser: true,
                timestamp: new Date(),
                displayText: this.newMessage // User messages show immediately
            });

            this.newMessage = '';
            this.isLoading = true;

            // Simulate AI thinking time
            setTimeout(() => {
                const response = this.getMagic8BallResponse();
                const botMessage: Message = {
                    text: response,
                    isUser: false,
                    timestamp: new Date(),
                    isTyping: true,
                    displayText: ''
                };

                this.messages.push(botMessage);
                this.isLoading = false;

                // Start typing animation
                this.startTypingAnimation(botMessage);
            }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
        }
    }

    private startTypingAnimation(message: Message) {
        // Clean up any existing subscription
        if (this.typingSubscription) {
            this.typingSubscription.unsubscribe();
        }

        // Start the typing animation with variable speed
        this.typingSubscription = this.typingService.typeTextWithVariableSpeed(message.text, 60).subscribe(
            (displayText) => {
                message.displayText = displayText;
                if (displayText === message.text) {
                    message.isTyping = false;
                }
            }
        );
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

    protected openInfoModal() {
        this.showInfoModal = true;
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    protected closeInfoModal() {
        this.showInfoModal = false;
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'auto';
    }

    @HostListener('document:keydown', ['$event'])
    protected onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (this.showInfoModal) {
                this.closeInfoModal();
            } else if (this.showModelPopup) {
                this.closeModelPopup();
            }
        }
    }

    protected toggleModelPopup() {
        this.showModelPopup = !this.showModelPopup;
    }

    protected closeModelPopup() {
        this.showModelPopup = false;
    }

    protected selectModel(modelId: string) {
        this.selectedModel = modelId;
        this.closeModelPopup();
        this.onModelChange();
    }

    protected onModelSelectorClick(event: Event) {
        // If the popup is open and we clicked on the container (not the button or popup content)
        if (this.showModelPopup && event.target === event.currentTarget) {
            this.closeModelPopup();
        }
    }

    protected onModelChange() {
        // Here you would typically make an API call to switch models
        console.log('Model changed to:', this.selectedModel);
        // For now, we'll just log the change
        // In a real implementation, you might want to:
        // - Update the API endpoint
        // - Clear the conversation
        // - Show a notification
    }

    protected getModelDisplayName(modelId: string): string {
        const modelNames: { [key: string]: string } = {
            'gpt-4': 'GPT-4',
            'gpt-3.5-turbo': 'GPT-3.5',
            'claude-3': 'Claude 3',
            'gemini-pro': 'Gemini'
        };
        return modelNames[modelId] || modelId;
    }

    protected getModelColor(modelId: string): string {
        const modelColors: { [key: string]: string } = {
            'gpt-4': '#10a37f', // OpenAI green
            'gpt-3.5-turbo': '#10a37f', // OpenAI green
            'claude-3': '#ff6b35', // Anthropic orange
            'gemini-pro': '#4285f4' // Google blue
        };
        return modelColors[modelId] || '#667eea';
    }


}
