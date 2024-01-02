import os
import random
import shutil

# Define the root directory of your dataset
root_dir = "cats-breads"

# Define the output directories for train, test, and val
output_dir = "cat-data"

# Define the percentage splits
train_split = 0.7
test_split = 0.1
val_split = 0.2

# Ensure the output directories exist
os.makedirs(os.path.join(output_dir, "train"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "test"), exist_ok=True)
os.makedirs(os.path.join(output_dir, "val"), exist_ok=True)

# Loop through the cat breed folders
for breed_folder in os.listdir(root_dir):
    if os.path.isdir(os.path.join(root_dir, breed_folder)):
        images = os.listdir(os.path.join(root_dir, breed_folder))
        random.shuffle(images)

        # Calculate the number of images for each split
        total_images = len(images)
        train_count = int(total_images * train_split)
        test_count = int(total_images * test_split)
        val_count = int(total_images * val_split)

        # Split the images and move them to the respective folders
        for i, image in enumerate(images):
            source_path = os.path.join(root_dir, breed_folder, image)
            if i < train_count:
                destination_dir = os.path.join(output_dir, "train", breed_folder)
            elif i < train_count + test_count:
                destination_dir = os.path.join(output_dir, "test", breed_folder)
            else:
                destination_dir = os.path.join(output_dir, "val", breed_folder)

            os.makedirs(destination_dir, exist_ok=True)
            shutil.copy(source_path, os.path.join(destination_dir, image))