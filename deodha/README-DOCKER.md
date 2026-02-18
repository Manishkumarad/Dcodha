# Deodha E-Commerce Platform - Docker & CI/CD Setup

## 🐳 Docker Setup

### Prerequisites
- Docker & Docker Compose installed
- Git

### Quick Start

1. **Clone and navigate to project:**
```bash
git clone https://github.com/Manishkumarad/Dcodha.git
cd Dcodha/deodha
```

2. **Environment Configuration:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Run with Docker Compose:**
```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

4. **Access the application:**
- Frontend: http://localhost
- API: http://localhost/api
- MySQL: localhost:3306

### Docker Commands

```bash
# Build image
docker build -t deodha-app .

# Run container
docker run -p 5000:5000 deodha-app

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up
docker system prune -a
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline includes:

1. **Testing Phase:**
   - Code linting
   - Unit tests
   - Security scanning with Trivy

2. **Build Phase:**
   - Docker image building
   - Push to GitHub Container Registry

3. **Deployment Phase:**
   - Staging deployment
   - Production deployment
   - Health checks

### Pipeline Triggers

- **Push to main:** Full pipeline execution
- **Pull requests:** Testing and security scanning only
- **Manual deployment:** Available via GitHub Actions

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster
- kubectl configured
- Ingress controller (nginx)

### Deployment Steps

1. **Create namespace:**
```bash
kubectl create namespace deodha
```

2. **Apply secrets:**
```bash
kubectl apply -f k8s/secrets.yml -n deodha
```

3. **Deploy MySQL:**
```bash
kubectl apply -f k8s/mysql-deployment.yml -n deodha
```

4. **Deploy application:**
```bash
kubectl apply -f k8s/deployment.yml -n deodha
```

5. **Setup ingress:**
```bash
kubectl apply -f k8s/ingress.yml -n deodha
```

### Monitoring & Scaling

```bash
# Check deployment status
kubectl get pods -n deodha

# Scale application
kubectl scale deployment deodha-app --replicas=5 -n deodha

# View logs
kubectl logs -f deployment/deodha-app -n deodha

# Port forward for local testing
kubectl port-forward service/deodha-app-service 8080:80 -n deodha
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 3306 |
| DB_USER | Database username | root |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | deodha_db |
| JWT_SECRET | JWT secret key | - |
| RAZORPAY_KEY_ID | Razorpay API key | - |
| RAZORPAY_KEY_SECRET | Razorpay secret | - |

### Production Considerations

1. **Security:**
   - Use strong passwords
   - Enable SSL/TLS
   - Regular security updates
   - Environment variable encryption

2. **Performance:**
   - Enable Gzip compression
   - Use CDN for static assets
   - Database optimization
   - Load balancing

3. **Monitoring:**
   - Application logs
   - Metrics collection
   - Health checks
   - Alerting setup

## 📊 Monitoring & Logging

### Health Checks

- **Application:** `/api/health`
- **Database:** MySQL health check
- **Container:** Docker health checks

### Logging

```bash
# Docker logs
docker-compose logs app
docker-compose logs mysql

# Kubernetes logs
kubectl logs -f deployment/deodha-app -n deodha
```

## 🔄 Deployment Strategies

### Blue-Green Deployment
- Zero downtime deployment
- Easy rollback
- Resource intensive

### Rolling Update
- Gradual replacement
- Resource efficient
- Built-in to Kubernetes

### Canary Deployment
- Test with small traffic
- Gradual rollout
- Advanced monitoring required

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection:**
   - Check environment variables
   - Verify network connectivity
   - Check database credentials

2. **Container Issues:**
   - Check Docker logs
   - Verify image build
   - Resource constraints

3. **Kubernetes Issues:**
   - Check pod status
   - Verify service configuration
   - Ingress setup

### Debug Commands

```bash
# Docker debugging
docker-compose exec app sh
docker-compose exec mysql mysql -u root -p

# Kubernetes debugging
kubectl exec -it deployment/deodha-app -n deodha -- sh
kubectl describe pod <pod-name> -n deodha
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
