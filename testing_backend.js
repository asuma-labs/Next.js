import { apiFetch } from './lib/auth';

async function run() {
  try {
    const data = await apiFetch('/api/dashboard/me');
    console.log('Result:', data);
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
