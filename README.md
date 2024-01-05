### Tail-TrackR -- GDSC Fall 2023


## Problem Statement

In today’s fast-paced world, pets occasionally go missing, causing distress for both owners and the animals themselves. The traditional methods of reuniting lost pets with their owners involves posting flyers, contacting local shelters, or posting on social media. All of these methods aren’t effective and are very time-consuming. Furthermore, there is a lack of real-time, community-driven solutions to aid in the recovery of lost animals. 

## Proposed Solution
As aforementioned, there is a lack of real-time, community-driven solutions to aid in the recovery of lost animals. We propose an end-to-end solution that leverages modern technology to revolutionize the process of reporting found animals, their identification, and subsequent reunification with their owners. We propose a web application that matches up pet owners with their lost pets if they go missing. The status quo at the moment sucks; traditional methods of reuniting lost pets with their owners involves posting flyers, contacting local shelters, or posting on social media. None of these are nearly as effective, the pipeline of getting a lost animal to its owner is extremely disjoint and there isn’t a clear flow defined. We built Tail TrackR — an application that allows users to upload pictures of lost animals + where they were found into our app. From that point onwards, we have a ML back-end which classifies the animal and any significant features i.e the breed, colour, eye colour, etc. Once this is done, the nearest animal shelter is automatically contacted and this information is fed into their database. For the owner, they can simply login to the app and they can say they lost an animal that has certain features and if a similar animal enters our database, they will be notified.

## Technical Stack

**Languages**: Javascript, Python 

**Frameworks**: React, Flask, Tensorflow, PyTorch

**Database**: MongoDB

## Team Members

**Dev Shah**: ML researcher @ UofT, Director @ UofT AI, Assistant VP of Engineering @ UTMIST, Prev. ML Engineer @ Interactions, ML Developer @ PhotoML, Research Intern @ Interac

## Timeline

**Month 1**: Functional dog breed model + basics of the UI/UX

**Month 2**: Implement user dashboard + cat breed model + allow users to create posts

**Month 3**: Pipeline ML models with animal classification + connect ML model to frontend + user authentication (email verification) + use Google Maps API for location 


## Documentation

All of the design choices made for Tail-TrackR can be found in the documentation [here](https://drive.google.com/file/d/1IqMZ8J38FCWrdh23JKehvJMs9rVCrUF2/view?usp=sharing).





