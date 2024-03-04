const axios = require('axios');
const now = require('performance-now');

const url = 'http://localhost:3500/auth';
const credentials = {
  username: 'root',
  password: 'pass!32'
};

let totalTime = 0;
const attempts = 30;

const testAuthTime = async () => {
  for (let i = 0; i < attempts; i++) {
    const start = now();
    try {
      await axios.post(url, credentials);
      const end = now();
      const elapsedTime = end - start;
      console.log(`Attempt ${i + 1}: ${elapsedTime.toFixed(3)} ms`);
      totalTime += elapsedTime;
    } catch (error) {
      console.error('Authentication failed:', error);
      return;
    }
  }

  const averageTime = totalTime / attempts;
  console.log(`Average authentication time: ${averageTime.toFixed(3)} ms`);
};

testAuthTime();
