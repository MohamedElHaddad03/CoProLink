import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

// Fonction pour récupérer le contenu du fichier texte depuis example.com
async function fetchTextFileContent() {
    try {
        // Récupération du contenu du fichier texte depuis example.com
        let response = await fetch('https://firebasestorage.googleapis.com/v0/b/coprolink-5035f.appspot.com/o/assets%2Furl.txt?alt=media&token=7b0b333b-443c-408e-8cbc-49696ebfe629');
        let text = await response.text();

        // Stockage du contenu dans l'Expo Local Storage
        await SecureStore.setItemAsync('textFileContent', text);
       // console.log('Contenu du fichier texte stocké avec succès dans l\'Expo Local Storage.');
    } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement ou du stockage du fichier texte :', error);
    }
}

// Appel de la fonction pour récupérer et stocker le contenu du fichier texte
fetchTextFileContent();

// Fetch file content and assign it to BASEURL
const BASEURL = SecureStore.getItem('textFileContent');
export default BASEURL;
//https://firebasestorage.googleapis.com/v0/b/coprolink-5035f.appspot.com/o/assets%2Furl.txt?alt=media&token=7b0b333b-443c-408e-8cbc-49696ebfe629