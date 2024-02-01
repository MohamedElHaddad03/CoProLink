import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, ScrollView, Dimensions, Alert, Linking, ProgressBarAndroid, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; // Import the firebase app instance
import * as Permissions from 'expo-permissions';
import useFetchSecure from '../hook/useFetchSecure';
import getBaseUrl from '../config';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const checkPermissions = async () => {
  // Check if permission is granted
  // const { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);

  // if (status !== 'granted') {
  //   // If permission is not granted, request it
  //   const { status: newStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

  //   if (newStatus !== 'granted') {
  //     console.log('Permission denied');
  //     return false;
  //   }
  // }

  return true;
};

const storage = getStorage(app);
const getBlobFroUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

//const documentBlob = await getBlobFroUri(image)

const DocumentsManager = () => {
  const [BASEURL,setBaseUrl]=useState('');

  useEffect(() => {
    const fetchBaseUrl = async () => {
        try {
            const BASEURL = await getBaseUrl();
            setBaseUrl(BASEURL);
        } catch (error) {
            console.error("Error fetching BASEURL:", error);
        }
    };

    fetchBaseUrl(); // Call the async function immediately
}, []);
  const [documents, setDocuments] = useState([]);
  const [documentsFilter, setDocumentsfilter] = useState([]);
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null); // Initialize 'data' state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();


  // Replace the axios.request options with the useFetch hook
  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/Docs');

  useEffect(() => {
    setError(fetchedError)
    setDocuments(fetchedData);
    setIsLoading(isLoadingData);


  }, [fetchedData, isLoadingData]);

  useEffect(() => {
    refetch();
  }, [])
  console.log("docs : ", documents)
  const getFileTypeIcon = (filename) => {
    if (filename && filename.endsWith) {
      if (filename.endsWith('.pdf')) {
        return 'picture-as-pdf';
      } else if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
        return 'description';
      } else if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) {
        return 'insert-chart';
      } else {
        return 'insert-drive-file';
      }
    }
    return 'insert-drive-file'; // Default icon if filename is undefined
  };
  
  let tempDocumentName = '';
  let tempDocumentUrl = '';


  function sanitizeFilename(str) {
    const accentMap = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
      'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
      'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
      'ç': 'c',
      'ñ': 'n'
      // Add more mappings as needed
    };
  
    const sanitizedStr = str
      .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[áéíóúàèìòùâêîôûäëïöüçñ]/g, match => accentMap[match] || match) // Replace accented characters
  
    return sanitizedStr;
  }
  
  const handleCreate = async () => {
    try {
      // Check if temp variables are filled
      if (tempDocumentName && tempDocumentUrl) {
        console.error("create :" + tempDocumentName + " ," + tempDocumentUrl + "," + user.User.profile.id_cop);
          tempDocumentName = sanitizeFilename(tempDocumentName);
          const NewDocument = {
          nomdoc: tempDocumentName,
          url: tempDocumentUrl,
          id_cop: user.User.profile.id_cop,
        };
        const options = {
          method: 'POST',
          url: `${BASEURL}/api/interfaces/Docs/create/`,
          data: NewDocument,
          headers: {
            Authorization: "Token " + user.Token,
          },
        };
  
        const response = await axios.request(options);
        console.log("data", response.data);
  
        // Reset temp variables after successful create
        tempDocumentName = '';
        tempDocumentUrl = '';
  
        refetch();
      } else {
        console.log('Temp variables are not filled. Skipping create.');
      }
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };


  const handleUpload = async (document, filename) => {
    try {
      const storageRef = ref(storage, `documents/${user.User.profile.id_cop}/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, document);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.error(progress);
        },
        (error) => {
          console.error('Error uploading document:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Document uploaded successfully. Download URL:', downloadURL);
  
            // Update temp variables
            tempDocumentName = filename;
            tempDocumentUrl = downloadURL;
  
            // Call handleCreate after updating temp variables
            await handleCreate();
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error handling upload:', error);
    }
  };
  
  


const saveChanges = () => {
  const checkProgress = () => {
    if (uploadProgress < 100) {
      setTimeout(checkProgress, 100); // Check progress again after 100 milliseconds
    } else {
      // Progress reached 100%, show success alert
      Alert.alert('Success', 'File Uploaded !!');
      handleCreate(); // Move handleCreate here
    }
  };

  checkProgress(); // Start checking progress
};



  const importDocument = async () => {
    try {
      const hasPermissions = await checkPermissions();
  
      if (hasPermissions || !hasPermissions) {
        const result = await DocumentPicker.getDocumentAsync({
          type: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ],
          copyToCacheDirectory: true,
        });
  
        console.log('Document Picker Result:', result);
  
        if (!result.cancelled) {
          const blob = await getBlobFroUri(result.assets[0].uri);
  
          await handleUpload(blob, result.assets[0].name); // Wait for the upload to complete
  
          // Save changes and call handleCreate after the upload is complete
          saveChanges();
        //  handleCreate();
        } else {
          console.log('Document picking cancelled by the user');
        }
      } else {
        console.log('Permission denied. Unable to access documents.');
      }
    } catch (error) {
      console.error('Error picking a document', error);
    }
  };
  
  








  // const openDocument = async (uri) => {
  //   try {
  //     const fileInfo = await FileSystem.getInfoAsync(uri);
  //     if (fileInfo.exists && fileInfo.isDirectory === false) {
  //       await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + fileInfo.uri.split('/').pop());
  //       const localUri = FileSystem.documentDirectory + fileInfo.uri.split('/').pop();
  //       await Linking.openURL(localUri);
  //     } else {
  //       console.log('File not found');
  //     }
  //   } catch (error) {
  //     console.error('Error opening document', error);
  //   }
  // };

  const renderDocumentItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.documentItem} onPress={() => {
        Linking.openURL(item.url);
      }}
      >
        <MaterialIcons
          name={getFileTypeIcon(item.name)}
          size={24}
          color="#3b67bb"
          style={styles.fileIcon}
        />
        <Text>{item.nomdoc}</Text>
      </TouchableOpacity>
    );
  };




  const refreshDocuments = () => {

  };



  const searchDocument = () => {
    const filteredUsers = documents.filter(
      (doc) =>
        doc.nomdoc.toLowerCase().includes(searchQuery.toLowerCase())
      //||
      //  doc.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDocuments(filteredUsers);
    if (!searchQuery) {
      refetch();
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Documents</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchDocument}
          onPointerLeave={() => refetch()}
        />
        <TouchableOpacity style={styles.importButton} onPress={importDocument}>
          <MaterialIcons name="cloud-upload" size={24} color="#fff" />
          <Text style={styles.importText}>Import</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior='height'>
      <View style={styles.progressBarContainer}>
  {uploadProgress >0 && uploadProgress <= 99 &&<ProgressBarAndroid
    styleAttr="Horizontal"
    indeterminate={false}
    progress={uploadProgress / 100}
    style={styles.progressBar}
  />}
</View>
{isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
       {!isLoading && <View style={styles.Flatlist} >
          <FlatList
            data={documents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDocumentItem}
            numColumns={1}
            onRefresh={refreshDocuments}
            refreshing={false}
            showsVerticalScrollIndicator={false}
          />
        </View>}

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    top: '10%',
    left: '5%',
    height: Dimensions.get('window'),
  },
  titleContainer: {
    top: '1%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  importButton: {
    flexDirection: 'row',
    backgroundColor: '#3b67bb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  importText: {
    color: '#fff',
    marginLeft: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  documentItem: {
    // overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    marginRight: 10,
    marginBottom: 10,
    width: '100%', // Adjust the width for two items per row
  },
  fileIcon: {
    marginRight: 10,
  },
  Flatlist: {
    alignSelf: 'center',
    width: '100%',
    maxHeight: '85%',
    marginTop: 20,
  }
});

export default DocumentsManager;
