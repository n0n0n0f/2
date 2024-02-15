new Vue({
    el: '#app',
    data: {
        column1: [],
        column2: [],
        column3: [],
        newCardTitle: ''
    },
    mounted() {
        if (localStorage.getItem('notes')) {
            const savedData = JSON.parse(localStorage.getItem('notes'));
            this.column1 = savedData.column1;
            this.column2 = savedData.column2;
            this.column3 = savedData.column3;
        }
    },
    methods: {
        addCard() {
            if (this.newCardTitle.trim() !== '') {
                if (this.column1.length < 3) {
                    this.column1.push({
                        title: this.newCardTitle,
                        items: [
                            { text: 'Пункт 1', checked: false },
                            { text: 'Пункт 2', checked: false },
                            { text: 'Пункт 3', checked: false }
                        ]
                    });
                }
                else {
                    alert("Нельзя добавить карточку во второй столбец из-за достижения лимита.");
                    return;
                }
                this.newCardTitle = '';

                localStorage.setItem('notes', JSON.stringify({
                    column1: this.column1,
                    column2: this.column2,
                    column3: this.column3
                }));
            }
        },
        moveToColumn2(card) {
            if (this.column2.length < 5) {
                this.column3.splice(this.column3.indexOf(card), 1);
                this.column2.push(card);
                card.completed = false;

                localStorage.setItem('notes', JSON.stringify({
                    column1: this.column1,
                    column2: this.column2,
                    column3: this.column3
                }));
            } else {
                alert("Нельзя переместить карточку во второй столбец из-за достижения лимита.");
            }
        },

        checkItem(card) {
            const checkedCount = card.items.filter(item => item.checked).length;
            const totalCount = card.items.length;
            const completionPercentage = (checkedCount / totalCount) * 100;

            if (completionPercentage >= 50 && this.column1.includes(card)) {
                if (this.column2.length < 5) {
                    this.column1.splice(this.column1.indexOf(card), 1);
                    this.column2.push(card);
                } else {
                    alert("Нельзя переместить карточку во второй столбец из-за достижения лимита.");
                    return;
                }
            }

            if (completionPercentage < 100) {
                card.completed = false;
            }

            if (completionPercentage === 100 && !this.column3.includes(card)) {
                card.completed = true;
                card.lastCompleted = new Date().toLocaleString();
                if (this.column2.includes(card)) {
                    this.column2.splice(this.column2.indexOf(card), 1);
                }
                this.column3.push(card);
            } else if (completionPercentage === 100 && this.column3.includes(card)) {
                card.lastCompleted = new Date().toLocaleString();
            } else {
                card.lastCompleted = "";
            }

            // Сохранение данных в localStorage
            localStorage.setItem('notes', JSON.stringify({
                column1: this.column1,
                column2: this.column2,
                column3: this.column3
            }));
        },

        resetCard(card) {
            card.items.forEach(item => {
                item.checked = false;
            });
            card.completed = false;
            localStorage.setItem('notes', JSON.stringify({
                column1: this.column1,
                column2: this.column2,
                column3: this.column3
            }));
        },
        resetAllCards() {
            this.column1 = [];
            this.column2 = [];
            this.column3 = [];
            localStorage.removeItem('notes');
        },
    }
});