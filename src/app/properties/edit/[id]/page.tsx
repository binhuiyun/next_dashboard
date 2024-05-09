"use client";

import { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import Form from '@components/common/Form';
import { useShow } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';

const EditProperty = () => {
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { data } = queryResult;
  const [propertyImage, setPropertyImage] = useState({ name: '', url: data?.data?.photo });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
    
  };

  const onFinishHandler = async (data) => {
    await onFinish({ ...data, photo: propertyImage.url, email: user.email });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default EditProperty;
