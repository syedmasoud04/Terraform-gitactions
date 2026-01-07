# AWS EKS Infrastructure with Terraform & GitHub Actions CI/CD

Deploy a Kubernetes cluster on AWS EKS with automated CI/CD pipeline.

## 📁 Project Structure

```
├── .github/workflows/
│   └── deploy.yml          # CI/CD pipeline
├── app/
│   ├── src/index.js        # Node.js application
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   └── deployment.yaml     # Kubernetes manifests
├── terraform/
│   ├── provider.tf         # AWS provider config
│   ├── variables.tf        # Input variables
│   ├── vpc.tf              # VPC & networking
│   ├── eks.tf              # EKS cluster & nodes
│   ├── ecr.tf              # Container registry
│   └── outputs.tf          # Output values
└── README.md
```

## ⚠️ Cost Warning

> **EKS is NOT free tier eligible!**
> - EKS control plane: ~$0.10/hour (~$73/month)
> - t3.small nodes (x2): ~$30/month
> - **Estimated total: ~$100+/month**
> 
> **Destroy resources immediately after testing to minimize costs!**

---

## 🚀 Step-by-Step Instructions

### STEP 1: Clean Git Setup (if needed)

If you have an existing .git folder, remove it first:

```bash
# For Git Bash / WSL:
rm -rf .git

# For PowerShell:
Remove-Item -Recurse -Force .git
```

### STEP 2: Initialize Git & Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - EKS infrastructure setup"
git remote add origin git@github.com:syedmasoud04/Terraform-gitactions.git
git branch -M main
git push -u origin main
```

### STEP 3: Add GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:
| Secret Name | Value |
|-------------|-------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key |

### STEP 4: Initialize Terraform

```bash
cd terraform
terraform init
```

### STEP 5: Preview Infrastructure Changes

```bash
terraform plan
```

### STEP 6: Create AWS Infrastructure

```bash
terraform apply
```

Type `yes` when prompted. **This takes 15-20 minutes!**

### STEP 7: Configure kubectl

After Terraform completes, run:

```bash
aws eks update-kubeconfig --region us-east-1 --name demo-eks-cluster
```

Verify connection:
```bash
kubectl get nodes
```

### STEP 8: Test the CI/CD Pipeline

Make any change to the code and push:

```bash
git add .
git commit -m "Trigger CI/CD"
git push
```

Go to GitHub → **Actions** tab to see the pipeline running.

### STEP 9: Access Your Application

After deployment, get the LoadBalancer URL:

```bash
kubectl get svc eks-demo-app-service
```

Look for the `EXTERNAL-IP` column - this is your app URL!

---

## 🧹 IMPORTANT: Cleanup to Avoid Charges

When done testing, **destroy all resources**:

```bash
cd terraform
terraform destroy
```

Type `yes` when prompted.

---

## 🔧 Useful Commands

```bash
# Check cluster info
kubectl cluster-info

# View all pods
kubectl get pods

# View pod logs
kubectl logs -f deployment/eks-demo-app

# Scale deployment
kubectl scale deployment eks-demo-app --replicas=3

# Delete and redeploy
kubectl delete -f k8s/deployment.yaml
kubectl apply -f k8s/deployment.yaml
```

## 📝 Notes

- The EKS cluster uses **us-east-1** region (matches your AWS CLI config)
- Worker nodes use **t3.small** instances (minimum viable for EKS)
- Application runs on port **3000** inside container, exposed on port **80** via LoadBalancer
# Testing CI/CD
