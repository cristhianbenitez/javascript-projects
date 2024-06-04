const qrInput = document.getElementById('qrInput');
const qrCodeDiv = document.getElementById('qrcode');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const qrCodeContainer = document.getElementById('qrcodeContainer');
const qrCodeGenerator = document.getElementById('qrcodeGenerator');
const logo = document.querySelectorAll('.logo');

let qrcode = null;

generateBtn.addEventListener('click', function () {
  let isValid = qrInput.checkValidity();
  if (!isValid) {
    qrInput.reportValidity();
    return;
  }
  if (qrcode) {
    qrcode.clear();
    qrcode = null;
  }
  qrCodeGenerator.style.display = 'none';
  qrCodeContainer.style.display = 'flex';
  qrcode = new QRCode(qrCodeDiv, {
    text: qrInput.value,
    width: 180,
    height: 180,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  qrInput.value = '';
  qrInput.focus();
});

const downloadQrCode = () => {
  const canvas = document.getElementById('qrcode').querySelector('canvas');
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = dataURL;
  link.click();
};

const shareQrCode = () => {
  const canvas = document.getElementById('qrcode').querySelector('canvas');
  const dataURL = canvas.toDataURL('image/png');
  navigator.clipboard.writeText(dataURL);
};

downloadBtn.addEventListener('click', downloadQrCode);
shareBtn.addEventListener('click', shareQrCode);

[...logo].forEach((logo) => {
  logo.addEventListener('click', () => {
    qrCodeDiv.innerHTML = '';
    qrCodeGenerator.style.display = 'flex';
    qrCodeContainer.style.display = 'none';
  });
});
