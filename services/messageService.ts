import { db, storage } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { WeddingMessage } from "../types/message";

export const messageService = {
  async sendMessage(message: string, imageFile?: File, voiceFile?: File) {
    let imageUrl = "";
    let voiceUrl = "";

    // Upload image if exists
    if (imageFile) {
      const imageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Upload voice if exists
    if (voiceFile) {
      const voiceRef = ref(storage, `voice/${Date.now()}-${voiceFile.name}`);
      await uploadBytes(voiceRef, voiceFile);
      voiceUrl = await getDownloadURL(voiceRef);
    }

    // Add message to Firestore
    return addDoc(collection(db, "messages"), {
      message,
      imageUrl,
      voiceUrl,
      timestamp: serverTimestamp(),
    });
  },
};
