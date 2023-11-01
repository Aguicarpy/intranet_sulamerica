import { useState } from "react"
import axios from "axios";
export const useForm = (addUser) => {

    const [formState, setFormState] = useState(addUser)
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false); // Estado para indicar si se está cargando la imagen
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleFileChange = (e) => {
      const file = e.target.files[0];
    
      setIsLoadingImage(true); // Activar el indicador de carga de imagen
    
      // Verificar si se seleccionó un archivo y es una imagen
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          // Cuando se cargue el archivo, establecer la vista previa de la imagen
          setImagePreview(e.target.result);
          setIsLoadingImage(false); // Desactivar el indicador de carga de imagen cuando esté completo
        };
    
        // Leer el archivo como una URL de datos (base64)
        reader.readAsDataURL(file);
      } 
    };

    const handleImageUpload = async (file) => {
      try {
        const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sulamerica");

      // Envía el archivo al servidor para que el servidor lo cargue en Cloudinary
      const response = await axios.post("http://localhost:3015/imgOfficer/upload", formData);

      if (response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setFormState((prevFormData) => ({
          ...prevFormData,
          imageUrl,
        }));
      }
      } catch (error) {
        console.error("Error al cargar la imagen a Cloudinary:", error);
      }
    };

    const onInputChange= async(e)=>{
        const { name, value } = e.target
        const newValue = name === "locals" ? [...formState[name], value] : value;
        setFormState({
            ...formState,
            [name]: newValue
        })
        setFormSubmitted(false)

        if (name === "imageUrl") {
          const file = e.target.files[0];
          handleFileChange(e);
          if (file) {
            try {
              await handleImageUpload(file); // Llamar a la función para cargar la imagen a Cloudinary
              setIsPhotoSelected(true);
              setSelectedFileName(file.name);
            } catch (error) {
              console.error("Error al cargar la imagen:", error);
            }
          } else {
            setIsPhotoSelected(false);
            setSelectedFileName("");
          }
        } else {
          setIsPhotoSelected(false);
        }
    }


  return {
    ...formState,
    formState,
    setFormState,
    imagePreview,
    isLoadingImage,
    setIsPhotoSelected,
    selectedFileName,
    setFormSubmitted,
    onInputChange
  }
}
