# Cameron Craddock's Web Resume

This is my resume in the cloud -- my entry into the  [#CloudResumeChallenge](https://forrestbrazeal.com/2020/04/23/the-cloud-resume-challenge/). The challenge is to implement my resume as a web application using Amazon Web Services technologies. This will include:

1. Completing the [AWS Cloud Practitioner certification](https://aws.amazon.com/certification/certified-cloud-practitioner/).

1. Implementing my resume in HTML and CSS and deploying it in S3.

2. Use cloundfront to make the resume available as a web page that is only accessible using HTTPS.

3. Point a domain name to the cloudfront distribution. I have registered computer-nerds.space for this purpose and plan to use cameron.comptuer-nerds.space for my resume. 

4. Create a web application to track and display the number of visits to the site. For now this will be pretty basic but in the future I would like this to display a plot.ly or d3.js graph of the number of daily (or weekly?) visitors. Other ideas for expanding this part of the challenge include creating a map of visitor locations or adding functionality that will use one of google's or AWS's machine learning APIs. The frontend will be javascript, the backend will be Python deployed using API Gateway, and the database will be DynamoDB. The backend should have tests!

1. Use some infrastructure-as-code system (IaC) for creating and deploying everything. The challenge suggests using an [AWS Serverless Application Model (SAM) template](https://aws.amazon.com/serverless/sam/). But I may choose to use [Terrform](https://www.terraform.io/), which I believe is pretty common in industry.

1. Use github actions to automatically deploy the frontend and backend based on some trigger. For example when a pull request is merged, or when a label is applied to the branch.

I have had some experience with nearly every aspect of this challenge. I have some experience with Javascript, but not much. The only thing that is completely new is IaC. This is why I have decided to 'raise the bar' by adding additional funcitonality to the web application.

I am really worried about accidentally committing an AWS secret to this repository. I have enabled [Git Guardian](https://dashboard.gitguardian.com/) on this repository as a prophylactic. I configured the pre-commit, pre-push, and pre-receive hooks to scan for secrets at commit, push, and before sending to Github. This may be overkill, but hey, it is my credit card on the line.







