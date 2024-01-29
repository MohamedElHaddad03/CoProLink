import * as SecureStore from 'expo-secure-store';

// Function to fetch the content of the text file from the URL
async function fetchTextFileContent() {
    try {
        // Fetching the content of the text file from the URL
        let response = await fetch('https://firebasestorage.googleapis.com/v0/b/coprolink-5035f.appspot.com/o/assets%2Furl.txt?alt=media&token=411d5186-cea8-4a7b-9e2a-0f473f207c93');
        let text = await response.text();

        // Storing the content in the Expo SecureStore
        await SecureStore.setItemAsync('textFileContent', text);
        console.log('Text file content stored successfully in Expo SecureStore.');

        return text; // Return the text content
    } catch (error) {
        console.error('An error occurred while loading or storing the text file:', error);
        return null;
    }
}

// Fetch the text file content and use it to set BASEURL
async function setBaseUrl() {
    try {
        const textFileContent = await fetchTextFileContent(); // Fetch the text content
        const BASEURL = textFileContent; // Set BASEURL to the fetched content
        console.log('BASEURL set:', BASEURL);
        return BASEURL; // Return the BASEURL
    } catch (error) {
        console.error('An error occurred while setting BASEURL:', error);
        return null;
    }
}

// Export BASEURL after it's fetched
export default async function getBaseUrl() {
    const BASEURL = await setBaseUrl();
    return BASEURL;
}
