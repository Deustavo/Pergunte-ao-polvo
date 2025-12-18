/**
 * Composable for managing donation information
 */
export const useDonation = () => {
  /**
   * PIX key for donations
   * Replace this with your actual PIX key
   */
  const pixKey = ref('ca99dd18-2148-4163-be33-2a3c1ea958f1');

  /**
   * State for tracking if PIX key was copied
   */
  const pixCopied = ref(false);

  /**
   * Copies PIX key to clipboard
   */
  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey.value);
      pixCopied.value = true;
      setTimeout(() => {
        pixCopied.value = false;
      }, 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy PIX key:', err);
      return false;
    }
  };

  return {
    pixKey,
    pixCopied,
    copyPixKey,
  };
};

