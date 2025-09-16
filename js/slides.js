/*
JavaScript Integration Instructions:
1. All functions are namespaced under RHCSlides to avoid global conflicts
2. Event listeners are scoped to #rhc-slides container
3. Keyboard shortcuts only work when focused on slides or at /slides.html
4. No global variables or functions are created
*/

(function() {
    'use strict';

    // Namespace all functionality
    const RHCSlides = {
        // State
        currentSlide: 1,
        totalSlides: 9,
        isFullscreen: false,
        notesVisible: false,

        // DOM elements
        container: null,
        slides: null,
        gotoModal: null,
        gotoInput: null,
        slideCounter: null,
        notes: null,

        // Initialize the slides system
        init() {
            // Only initialize if we're on the slides page or container exists
            this.container = document.getElementById('rhc-slides');
            if (!this.container) return;

            this.cacheElements();
            this.bindEvents();
            this.updateSlide();
            this.updateProgress();

            // Set focus to container for keyboard navigation
            this.container.setAttribute('tabindex', '0');
            this.container.focus();
        },

        // Cache DOM elements
        cacheElements() {
            this.slides = this.container.querySelectorAll('.slide');
            this.gotoModal = this.container.querySelector('.goto-modal');
            this.gotoInput = this.container.querySelector('.goto-input');
            this.slideCounter = this.container.querySelector('.slide-counter');
            this.notes = this.container.querySelectorAll('.notes');
        },

        // Bind all event listeners
        bindEvents() {

            // Go to slide modal
            this.gotoInput?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.goToSlideFromInput();
                if (e.key === 'Escape') this.hideGotoModal();
            });

            this.gotoModal?.querySelector('.goto-go')?.addEventListener('click', () => this.goToSlideFromInput());
            this.gotoModal?.querySelector('.goto-cancel')?.addEventListener('click', () => this.hideGotoModal());

            // Keyboard navigation - scoped to container or slides page
            this.bindKeyboardEvents();

            // Close modals on background click
            this.gotoModal?.addEventListener('click', (e) => {
                if (e.target === this.gotoModal) this.hideGotoModal();
            });
        },

        // Bind keyboard events with proper scoping
        bindKeyboardEvents() {
            const keyHandler = (e) => {
                // Only handle keys if we're on slides page OR focused inside slides container
                const isOnSlidesPage = window.location.pathname.endsWith('/slides.html');
                const isFocusedInSlides = this.container.contains(document.activeElement) ||
                                        document.activeElement === this.container;

                if (!isOnSlidesPage && !isFocusedInSlides) return;

                // Don't interfere with input fields
                if (e.target.tagName === 'INPUT') return;

                switch(e.key) {
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        e.preventDefault();
                        this.previousSlide();
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'f':
                    case 'F':
                        e.preventDefault();
                        this.toggleFullscreen();
                        break;
                    case 'g':
                    case 'G':
                        e.preventDefault();
                        this.showGotoModal();
                        break;
                    case 'n':
                    case 'N':
                        e.preventDefault();
                        this.toggleNotes();
                        break;
                    case 'Escape':
                        if (this.gotoModal?.classList.contains('show')) {
                            this.hideGotoModal();
                        }
                        break;
                }
            };

            document.addEventListener('keydown', keyHandler);
        },

        // Navigation methods
        nextSlide() {
            if (this.currentSlide < this.totalSlides) {
                this.currentSlide++;
                this.updateSlide();
                this.updateProgress();
            }
        },

        previousSlide() {
            if (this.currentSlide > 1) {
                this.currentSlide--;
                this.updateSlide();
                this.updateProgress();
            }
        },

        goToSlide(slideNumber) {
            if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
                this.currentSlide = slideNumber;
                this.updateSlide();
                this.updateProgress();
            }
        },

        // Update slide display
        updateSlide() {
            this.slides?.forEach((slide, index) => {
                if (index + 1 === this.currentSlide) {
                    slide.classList.add('active');
                    slide.setAttribute('aria-hidden', 'false');
                } else {
                    slide.classList.remove('active');
                    slide.setAttribute('aria-hidden', 'true');
                }
            });


            // Hide notes when changing slides
            if (this.notesVisible) {
                this.hideNotes();
            }
        },

        // Update progress indicator
        updateProgress() {
            if (this.slideCounter) {
                this.slideCounter.textContent = `Slide ${this.currentSlide} / ${this.totalSlides}`;
            }
        },


        // Go to slide modal methods
        showGotoModal() {
            if (this.gotoModal && this.gotoInput) {
                this.gotoModal.classList.add('show');
                this.gotoModal.setAttribute('aria-hidden', 'false');
                this.gotoInput.value = '';
                this.gotoInput.focus();
            }
        },

        hideGotoModal() {
            if (this.gotoModal) {
                this.gotoModal.classList.remove('show');
                this.gotoModal.setAttribute('aria-hidden', 'true');
                this.container?.focus();
            }
        },

        goToSlideFromInput() {
            const slideNumber = parseInt(this.gotoInput?.value);
            if (slideNumber && slideNumber >= 1 && slideNumber <= this.totalSlides) {
                this.goToSlide(slideNumber);
                this.hideGotoModal();
            } else {
                // Invalid input - shake the input field
                if (this.gotoInput) {
                    this.gotoInput.style.animation = 'shake 0.3s';
                    setTimeout(() => {
                        this.gotoInput.style.animation = '';
                    }, 300);
                }
            }
        },

        // Fullscreen methods
        toggleFullscreen() {
            if (!document.fullscreenEnabled) return;

            if (this.isFullscreen) {
                document.exitFullscreen?.();
                this.isFullscreen = false;
            } else {
                this.container?.requestFullscreen?.();
                this.isFullscreen = true;
            }
        },

        // Speaker notes methods
        toggleNotes() {
            if (this.notesVisible) {
                this.hideNotes();
            } else {
                this.showNotes();
            }
        },

        showNotes() {
            const currentSlideElement = this.container?.querySelector(`[data-slide="${this.currentSlide}"]`);
            const noteElement = currentSlideElement?.querySelector('.notes');

            if (noteElement) {
                noteElement.classList.add('show');
                this.notesVisible = true;
            }
        },

        hideNotes() {
            const visibleNotes = this.container?.querySelectorAll('.notes.show');
            visibleNotes?.forEach(note => note.classList.remove('show'));
            this.notesVisible = false;
        }
    };

    // Add shake animation for invalid input
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => RHCSlides.init());
    } else {
        RHCSlides.init();
    }

    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', () => {
        RHCSlides.isFullscreen = !!document.fullscreenElement;
    });

    // Handle visibility changes (for pausing/resuming when tab not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - could pause any animations or timers
        } else {
            // Page is visible - could resume animations or timers
            if (RHCSlides.container) {
                RHCSlides.container.focus();
            }
        }
    });

})();