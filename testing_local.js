fetch('http://localhost:3000/api/auth/request-otp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ phone: '628123456789' })
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  const text = await res.text();
  console.log('Body:', text.substring(0, 200));
}).catch(console.error);
