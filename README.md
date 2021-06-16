# Cameron Craddock's Web Resume



This is my resume in the cloud -- my entry into the  [#CloudResumeChallenge](https://forrestbrazeal.com/2020/04/23/the-cloud-resume-challenge/). The challenge is to implement my resume as a web application using Amazon Web Services technologies. This will include:

1. Completing the [AWS Cloud Practitioner certification](https://aws.amazon.com/certification/certified-cloud-practitioner/).

1. Implementing my resume in HTML and CSS and deploying it in S3.

2. Use cloundfront to make the resume available as a web page that is only accessible using HTTPS.

3. Point a domain name to the cloudfront distribution. I have registered cameroncraddock.net for this purpose.

4. Create a web application to track and display the number of visits to the site. For now this will be pretty basic but in the future I would like this to display a plot.ly or d3.js graph of the number of daily (or weekly?) visitors. Other ideas for expanding this part of the challenge include creating a map of visitor locations or adding functionality that will use one of google's or AWS's machine learning APIs. The frontend will be javascript, the backend will be Python deployed using API Gateway, and the database will be DynamoDB. The backend should have tests!

1. Use some infrastructure-as-code system (IaC) for creating and deploying everything. The challenge suggests using an [AWS Serverless Application Model (SAM) template](https://aws.amazon.com/serverless/sam/). But I may choose to use [Terrform](https://www.terraform.io/), which I believe is pretty common in industry.

1. Use github actions to automatically deploy the frontend and backend based on some trigger. For example when a pull request is merged, or when a label is applied to the branch.

I have had some experience with nearly every aspect of this challenge. I have some experience with Javascript, but not much. The only thing that is completely new is IaC. This is why I have decided to 'raise the bar' by adding additional functionality to the web application.

I am really worried about accidentally committing an AWS secret to this repository. I have enabled [Git Guardian](https://dashboard.gitguardian.com/) on this repository as a prophylactic. I configured the pre-commit, pre-push, and pre-receive hooks to scan for secrets at commit, push, and before sending to Github. This may be overkill, but hey, it is my credit card on the line. I came across aws-vault when watching some youtube videos and have decided to use that as an additional means to avoid pushing my AWS keys to github.

I installed aws-vault from [its repository](https://github.com/99designs/aws-vault/releases/tag/v6.3.1) and then followed the instructions in [this youtube video](https://www.youtube.com/watch?v=qfOSaCFnYCk) to set up my credentials.
 - aws-vault: https://github.com/99designs/aws-vault


I decided to start with the dev/ops with the goal of it making the future development tasks easier. Thus I am beginning with learning about Terraform. I will be using docker and docker-compose to run terraform, so I will install that using instructions from here: 
 - Docker (Linux): [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
 - Docker Compose (Linux): [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

 I then setup a docker-compse.yml file for executing terraform using instructions in [the youtube video](https://www.youtube.com/watch?v=qfOSaCFnYCk)

I think it is best to have a create a fresh python virtual environment with just the tools that I need for this project. Since I am using [anaconda](https://www.anaconda.com/products/individual), this is done with the following commands:

    conda create --name resume_env python=3.9
    conda activate resume_env

Now install awscli, which provides a command line interface to AWS:
    
    pip install awscli

Looking around I found that there are few good tutorials and youtube videos that describe exactly what I am trying to do. I 
really liked [this video](https://www.youtube.com/watch?v=S-rZl9VYgnU). Rather than just copying the code from the video, I decided to use the code in their repository [https://github.com/dyords/pablosspot/tree/main/ep-07](https://github.com/dyords/pablosspot/tree/main/ep-07). Ideally I could fork the repo or use access it as a submodule, but since the repository also included code for other projects, I decided to copy the code into my repository. This provides an initial configuration, which includes:
- encrypted S3 bucket, set to private
- cloudfront distribution
- user to allow cloudfront access to S3 bucket
- certificate to enable HTTPS
- all the routes

Getting this to work as implemented requires that you setup a S3 Bucket as a Terraform Backend, I followed this video: [AWS and Terraform: S3 Bucket as Terraform Backend](https://www.youtube.com/watch?v=przZU7VBBGU). Apparently the database key should be 'LockID' and not 'LockId' as is shown in the video.

Whoa! It finally works! For now I am just using the plain text version of my resume that I downloaded from google docs. I will make it better in time.


### Acknowledgements
Uses code snippets from the following sources: 
- [https://github.com/dyords/pablosspot/tree/main/ep-07](https://github.com/dyords/pablosspot/tree/main/ep-07)






    










