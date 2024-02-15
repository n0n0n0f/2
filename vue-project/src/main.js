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

        }
});