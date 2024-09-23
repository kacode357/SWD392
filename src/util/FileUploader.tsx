import React, { useState, useEffect } from 'react';
import { Upload, Image, message } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';
import type { UploadFile, UploadProps } from 'antd';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
  defaultImage?: string;
  type?: 'image' | 'video';
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess, defaultImage }) => {
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (defaultImage) {
      setFileList([{ uid: '-1', name: 'default_image', url: defaultImage, status: 'done' }]);
      setPreviewImage(defaultImage);
    }
  }, [defaultImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!allowedImageExtensions.includes(fileExtension!)) {
      message.error('Invalid file type. Only images are allowed.');
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Update progress if needed
          console.log('Upload progress:', (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          message.error('Upload error');
          console.error('Upload error:', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          setUploading(false);
        }
      );
    } catch (error) {
      message.error('Error uploading file');
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false;
    },
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    listType: 'picture-circle',
    showUploadList: {
      showRemoveIcon: !uploading,
    },
    accept: 'image/*',
  };

  return (
    <>
      <Upload {...uploadProps}>
        {fileList.length >= 1 ? null : <div>Upload</div>}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FileUploader;
