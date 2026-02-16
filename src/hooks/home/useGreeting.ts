import { useState, useEffect } from 'react';

interface Greeting {
  message: string;
}

export const useGreeting = () => {
  const [greeting, setGreeting] = useState<Greeting>({ message: '' });

  useEffect(() => {
    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    let message = '';

    if (hour >= 5 && hour < 12) {
      message = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      message = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      message = 'Good evening';
    } else {
      message = 'Good night';
    }

    setGreeting({ message });
  };

  return greeting;
};
