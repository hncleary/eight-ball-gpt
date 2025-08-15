import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-info-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './info-modal.component.html',
    styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
    @HostListener('document:keydown', ['$event'])

    protected onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && this.isOpen) {
            this.closeModal();
        }
    }

    protected closeModal() {
        this.close.emit();
    }

    protected onOverlayClick(event: Event) {
        if (event.target === event.currentTarget) {
            this.closeModal();
        }
    }
}
