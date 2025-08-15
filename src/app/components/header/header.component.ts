import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @Output() modelChange = new EventEmitter<string>();
    @Output() infoClick = new EventEmitter<void>();

    protected showModelPopup: boolean = false;
    protected selectedModel: string = '8GPT';

    protected toggleModelPopup() {
        this.showModelPopup = !this.showModelPopup;
    }

    protected closeModelPopup() {
        this.showModelPopup = false;
    }

    protected selectModel(modelId: string) {
        this.selectedModel = modelId;
        this.closeModelPopup();
        this.modelChange.emit(modelId);
    }

    protected onModelSelectorClick(event: Event) {
        if (this.showModelPopup && event.target === event.currentTarget) {
            this.closeModelPopup();
        }
    }

    protected openInfoModal() {
        this.infoClick.emit();
    }

    protected getModelDisplayName(modelId: string): string {
        const modelNames: { [key: string]: string } = {
            '8GPT-mini': '8GPT-mini',
            '8GPT': '8GPT',
            '8GPT-o': '8GPT-o',
            '8GPT-ultra': '8GPT-ultra'
        };
        return modelNames[modelId] || modelId;
    }
}
