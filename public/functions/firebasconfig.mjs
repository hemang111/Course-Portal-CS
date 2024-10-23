// firebaseConfig.js

async function fetchFirebaseConfig() {
    const response = await fetch('/firebase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch Firebase configuration');
    }

    const firebaseConfig = await response.json();
    return firebaseConfig;
}

// Export the fetch function
export { fetchFirebaseConfig };
