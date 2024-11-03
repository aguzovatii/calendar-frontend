# calendar-frontend

The frontend for [calendar](https://calendar.aguzovatii.com).

## Getting Started

First, make sure that the [backend](https://github.com/calendar-team/calendar-backend) is running.

Then, run the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.

## Deploy to K8S

We use a github actions workflow: [deployment_to_k8s.yml](./.github/workflows/deployment_to_k8s.yml) to deploy the app to K8S. The workflow is triggered every time a commit is merged on master and pushed to github.

Before the first deployment, a few secrets should be added on the repo:

1. `CONTAINER_REGISTRY_URL`, `CONTAINER_REGISTRY_USER`, and `CONTAINER_REGISTRY_PASSWORD` - the credentials for pushing to container registry. The credentials can be found as part of `ghcr.io container registry credentials` secret in bitwarden.
2. `K8S_URL`, and `K8S_SECRET` - the credentials for deploying to K8S cluster.
   1. `K8S_URL` - set this to `https://aguzovatii.com:6443`
   2. `K8S_SECRET` - copy the whole yaml output from the following command:
      ```
      kubectl get secret continuous-deployment -oyaml
      ```
3. `NEXTAUTH_SECRET` - randomly generated string to encrypt the cookies. The format should be:

   ```
   {
       "nextauth-secret": ""
   }
   ```
