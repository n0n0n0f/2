new Vue({
    el: '#app',
    data: {
        column1: [],
        column2: [],
        column3: [],
        newCardTitle: ''
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
            }
        },
        moveToColumn2(card) {
            if (this.column2.length < 5) {
                this.column3.splice(this.column3.indexOf(card), 1);
                this.column2.push(card);
                card.completed = false;
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
                if (this.column2.includes(card)) {
                    this.column2.splice(this.column2.indexOf(card), 1);
                }
                this.column3.push(card);
            } else if (completionPercentage === 100 && this.column3.includes(card)) {
            } else {
                card.lastCompleted = "";
            }
        },
    }
});