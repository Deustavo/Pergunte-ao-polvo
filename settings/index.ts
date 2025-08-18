import { onMounted, computed, ref } from "vue";

const Settings = () => {
    const theme = ref('light');

    onMounted(() => {
        theme.value = localStorage.getItem('theme') || 'light';
    });

    return {
        toggleTheme: () => {
            theme.value = theme.value === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', theme.value);
        },
        getTheme: computed(() => theme.value)
    }
};

export default Settings;