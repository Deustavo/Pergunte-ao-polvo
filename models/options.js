import { ref } from 'vue';

export default class OptionsForm {
    list = ref([
        {
            name: 'option1',
            placeholder: 'Opção 1',
            value: '',
        },
        {
            name: 'option2',
            placeholder: 'Opção 2',
            value: '',
        },
    ]);

    minLengthOptions = 2;

    addOption = () => {
        this.list.value.push({
            name: `option${this.list.value.length + 1}`,
            placeholder: `Opção ${this.list.value.length + 1}`,
            value: '',
        });
    };

    removeOption = () => {
        if (this.list.value.length <= this.minLengthOptions) {
            return;
        }

        this.list.value.pop();
    };
}