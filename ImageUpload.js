import React, { useRef, useState } from 'react';
import { View, Text, Button, Image, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uploadMediaAsync from './firebase'; // Update the import

const ImageUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Sorry, we need camera roll permissions to make this work.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.21,
    });

    if (!result.cancelled) {
      // Set the selected image URI to the state
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    try {
      if (!image) {
        Alert.alert('No image selected', 'Please select an image before uploading.');
        return;
      }
      // Store download URL in Firestore
      // Add otherData as needed, e.g., { min: minValue, max: maxValue }
      await storeMediaInFirestore(downloadURL, { min: minValue, max: maxValue });

      Alert.alert('Upload successful', 'Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'An error occurred while uploading the image. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Minimum Value"
        keyboardType="numeric"
        value={minValue}
        onChangeText={(text) => setMinValue(text)}
      />
      <TextInput
        placeholder="Maximum Value"
        keyboardType="numeric"
        value={maxValue}
        onChangeText={(text) => setMaxValue(text)}
      />
      <Button title="Pick an image" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={handleUpload} />
    </View>
  );
};

export default ImageUploadScreen;
