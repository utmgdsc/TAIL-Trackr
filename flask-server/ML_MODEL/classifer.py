# -*- coding: utf-8 -*-
"""Classifier.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1nIlbSvZ9r2mOIP1iYGQ859T3rYSfFlu-
"""

import torch
import torchvision.models as models
import torch.nn as nn
import requests
from PIL import Image
from io import BytesIO
import torchvision.transforms as transforms
import tensorflow as tf
import warnings
warnings.filterwarnings('ignore')

import os
import numpy as np
import pandas as pd
import PIL
import cv2
import requests
from io import BytesIO
import matplotlib.pyplot as plt

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, array_to_img, img_to_array
from tensorflow.keras import Sequential
from tensorflow.keras.layers import GlobalAveragePooling2D, Dropout, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

from tensorflow.keras.backend import clear_session

from tensorflow.keras.applications import InceptionResNetV2,InceptionV3
from tensorflow.keras.applications.vgg19 import VGG19
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2
from tensorflow.keras.applications.xception import Xception
import difflib
import json
import os
### ---------------------------------- ###

def preprocess_image(imageData):
    img = Image.open(BytesIO(imageData)).convert('RGB')
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(256),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    img = preprocess(img)
    return img.unsqueeze(0)


def classify(imageData):
    vgg19 = models.vgg19(pretrained=False)
    vgg19.classifier[6] = nn.Linear(4096, 90)
    model_state_path = os.path.join('ML_MODEL', 'model.pth')
    state_dict = torch.load(model_state_path, map_location=torch.device('cpu'))

    vgg19.load_state_dict(state_dict)

    vgg19.eval()

    with torch.no_grad():
        outputs = vgg19(preprocess_image(imageData))
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        predicted_class = torch.argmax(probabilities).item()
        
    if predicted_class == 18:
        ## call the dog model
        model = tf.keras.models.load_model(os.path.join('ML_MODEL', 'dogmodel.h5'))
        
        TRAIN_DIR = os.path.join('ML_MODEL', 'dog_data', 'train')
        VAL_DIR = os.path.join('ML_MODEL', 'dog_data', 'valid')
        TEST_DIR = os.path.join('ML_MODEL', 'dog_data', 'test')

        DIMS = (224,224)
        IMG_SIZE = 224
        BATCH_SIZE = 32
        SEED = 42

        data_gen = ImageDataGenerator(rescale=1/255)

        train_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=TRAIN_DIR, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')

        val_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=VAL_DIR, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')

        test_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=TEST_DIR, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')


        label_mapper = np.asarray(list(train_data.class_indices.keys()))
        img = load_img(BytesIO(imageData), target_size=DIMS)

        
        def predictor(img):
            #display(img)
            arr = img_to_array(img)
            arr = arr/255.0
            arr = np.expand_dims(arr,0)
            res = model.predict(arr)
            print(res.shape)
            idx = res.argmax()
            return label_mapper[idx], res[0][idx]

        val,prob = predictor(img)
        
        features = []
        parent_directory = os.pardir
        paths = [os.path.join(parent_directory, 'client', 'src', 'color.json'),
                 os.path.join(parent_directory, 'client', 'src', 'fur.json'),
                 os.path.join(parent_directory, 'client', 'src', 'weight.json')]

        for file_path in paths:
            with open(file_path, 'r') as file:
                json_data = json.load(file)

            for key, value in json_data.items():
                if val in value:
                    features.append(key)
        
        print(f'Breed: {val}')
        for f in features:
            print(f)
        
        return {'Breed' : val,
                'Features' : features,
                'Animal' : 'Dog'}
        
    elif predicted_class == 9:
        model = tf.keras.models.load_model(os.path.join('ML_MODEL', 'catmodel.h5'))

        TRAIN_DIR1 = os.path.join('ML_MODEL', 'cat-data', 'train')
        VAL_DIR1 = os.path.join('ML_MODEL', 'cat-data', 'val')
        TEST_DIR1 = os.path.join('ML_MODEL', 'cat-data', 'test')

        DIMS = (224,224)
        IMG_SIZE = 224
        BATCH_SIZE = 32
        SEED = 42

        data_gen = ImageDataGenerator(rescale=1/255)

        train_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=TRAIN_DIR1, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')

        val_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=VAL_DIR1, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')

        test_data = data_gen.flow_from_directory(batch_size=BATCH_SIZE, directory=TEST_DIR1, shuffle=True,
                                                    target_size=DIMS, class_mode='categorical')


        label_mapper1 = np.asarray(list(train_data.class_indices.keys()))


        def predictor1(img):
            #display(img)
            arr = img_to_array(img)
            arr = arr/255.0
            arr = np.expand_dims(arr,0)
            res = model.predict(arr)
            print(res.shape)
            idx = res.argmax()
            return label_mapper1[idx], res[0][idx]

        img = load_img(BytesIO(imageData), target_size=DIMS)

        val,prob = predictor1(img)

        features = []
        parent_directory = os.pardir
        paths = [os.path.join(parent_directory, 'client', 'src', 'cat_color.json'),
                 os.path.join(parent_directory, 'client', 'src', 'cat_weight.json')]

        for file_path in paths:
            with open(file_path, 'r') as file:
                json_data = json.load(file)

            for key, value in json_data.items():
                if val in value:
                    features.append(key)
        
        print(f'Breed: {val}')
        for f in features:
            print(f)

        return {'Breed' : val,
                'Features' : features,
                'Animal' : 'Cat'}

    else:
        print("please input a cat or a dog")
        
        return {'Breed' : None}




    # Perform further operations based on the predicted class or probabilities
    # For example, print the predicted class index and its probability
    # print(f"Probability: {probabilities[predicted_class].item()}")