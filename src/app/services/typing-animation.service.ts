import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TypingAnimationService {

    constructor() { }

    /**
     * Creates an observable that emits the text character by character
     * @param fullText The complete text to animate
     * @param speedMs Speed between each character in milliseconds
     * @returns Observable that emits the current text state
     */
    typeText(fullText: string, speedMs: number = 50): Observable<string> {
        return timer(0, speedMs).pipe(
            map(index => {
                if (index >= fullText.length) {
                    return fullText;
                }
                return fullText.substring(0, index + 1);
            })
        );
    }

    /**
     * Creates a typing animation with variable speed for more realistic effect
     * @param fullText The complete text to animate
     * @param baseSpeedMs Base speed between characters
     * @returns Observable that emits the current text state
     */
    typeTextWithVariableSpeed(fullText: string, baseSpeedMs: number = 50): Observable<string> {
        return new Observable(observer => {
            let currentIndex = 0;

            const typeNextChar = () => {
                if (currentIndex >= fullText.length) {
                    observer.next(fullText);
                    observer.complete();
                    return;
                }

                const currentText = fullText.substring(0, currentIndex + 1);
                observer.next(currentText);
                currentIndex++;

                // Variable speed: slower for punctuation, faster for spaces
                const char = fullText[currentIndex - 1];
                let delay = baseSpeedMs;

                if (char === '.' || char === '?' || char === '!' || char === ',') {
                    delay = baseSpeedMs * 2; // Pause longer for punctuation
                } else if (char === ' ') {
                    delay = baseSpeedMs * 0.5; // Faster for spaces
                }

                // Add some randomness to make typing feel more human
                delay += Math.random() * 20 - 10; // ±10ms variation
                delay = Math.max(delay, 20); // Ensure minimum delay

                setTimeout(typeNextChar, delay);
            };

            // Add a small delay before starting to type for more realistic effect
            setTimeout(typeNextChar, 300);
        });
    }
}
