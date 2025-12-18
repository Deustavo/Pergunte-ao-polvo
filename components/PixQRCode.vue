<script setup lang="ts">
/**
 * Component to display PIX QR Code for donations
 * Optional component - requires qrcode library to be installed
 * npm install qrcode
 */
interface Props {
  pixKey: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 256,
});

const qrCodeDataUrl = ref<string>('');
const isLoading = ref(true);
const hasError = ref(false);

/**
 * Adds length prefix to a value (EMV format: LLVV where LL is length and VV is value)
 */
const formatEMV = (id: string, value: string): string => {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
};

/**
 * Calculates CRC16-CCITT for PIX
 */
const calculateCRC16 = (str: string): string => {
  let crc = 0xFFFF;
  
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Generates PIX payment string (EMV format)
 */
const generatePixPayload = (key: string): string => {
  // Payload Format Indicator
  const payloadFormatIndicator = formatEMV('00', '01');
  
  // Merchant Account Information
  const gui = formatEMV('00', 'br.gov.bcb.pix');
  const pixKey = formatEMV('01', key);
  const merchantAccountInfo = formatEMV('26', gui + pixKey);
  
  // Merchant Category Code
  const merchantCategoryCode = formatEMV('52', '0000');
  
  // Transaction Currency (986 = BRL)
  const transactionCurrency = formatEMV('53', '986');
  
  // Country Code
  const countryCode = formatEMV('58', 'BR');
  
  // Merchant Name
  const merchantName = formatEMV('59', 'Pergunte ao Polvo');
  
  // Merchant City
  const merchantCity = formatEMV('60', 'SAO PAULO');
  
  // Additional Data Field Template
  const txid = formatEMV('05', '***');
  const additionalDataField = formatEMV('62', txid);
  
  // Build payload without CRC
  const payloadWithoutCRC = 
    payloadFormatIndicator +
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField +
    '6304';
  
  // Calculate and append CRC
  const crc = calculateCRC16(payloadWithoutCRC);
  
  return payloadWithoutCRC + crc;
};

/**
 * Generates QR Code from PIX key
 */
const generateQRCode = async () => {
  try {
    isLoading.value = true;
    hasError.value = false;

    const hasQRCode = await checkQRCodeLibrary();
    
    if (!hasQRCode) {
      hasError.value = true;
      console.warn('QRCode library not found. Install with: npm install qrcode');
      return;
    }

    const QRCode = (await import('qrcode')).default;
    const pixPayload = generatePixPayload(props.pixKey);
    qrCodeDataUrl.value = await QRCode.toDataURL(pixPayload, {
      width: props.size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch (error) {
    console.error('Error generating QR Code:', error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

/**
 * Checks if qrcode library is available
 */
const checkQRCodeLibrary = async (): Promise<boolean> => {
  try {
    await import('qrcode');
    return true;
  } catch {
    return false;
  }
};

onMounted(() => {
  generateQRCode();
});

watch(() => props.pixKey, () => {
  generateQRCode();
});
</script>

<template>
  <div class="qr-code-container">
    <div v-if="isLoading" class="qr-loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Gerando QR Code...</p>
    </div>

    <div v-else-if="hasError" class="qr-error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>QR Code não disponível</p>
      <small>Instale a biblioteca qrcode: npm install qrcode</small>
    </div>

    <div v-else class="qr-code">
      <img :src="qrCodeDataUrl" alt="QR Code PIX" />
      <p class="qr-instruction">Escaneie com seu app de pagamentos</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-loading,
.qr-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #666;

  i {
    font-size: 32px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  small {
    font-size: 12px;
    color: #999;
  }
}

.qr-error {
  i {
    color: #D63F8C;
  }
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .qr-instruction {
    margin: 0;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
}
</style>

