/* ------------------------------------------------------- */
/*                  TYPEWRITER TEXT EFFECT                 */
/* ------------------------------------------------------- */

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {

        // Element where animated text appears
        this.txtElement = txtElement;

        // Words array from HTML
        this.words = words;

        // Current text being displayed
        this.txt = '';

        // Index of current word
        this.wordIndex = 0;

        // Time to wait after full word
        this.wait = parseInt(wait, 10);

        // Type/delete mode
        this.isDeleting = false;

        // Start typing
        this.type();
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;

        // Full text of that word
        const fullTxt = this.words[current];

        // Typing or deleting
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert into HTML
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Base typing speed
        let typeSpeed = 100;

        // Faster when deleting
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // Word completed
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;   // wait before deleting
            this.isDeleting = true;  // start deleting
        }
        // Word removed completely
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;  // start typing next word
            this.wordIndex++;
            typeSpeed = 500;
        }

        // Continue typing
        setTimeout(() => this.type(), typeSpeed);
    }
}


/* ------------------------------------------------------- */
/*                INITIALIZING TYPEWRITER                  */
/* ------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}


/* ------------------------------------------------------- */
/*                 SIDEMENU SHOW / HIDE                    */
/* ------------------------------------------------------- */

let menu = document.querySelector('.slide');

function barHide() {
    menu.classList.toggle("hide");
}
