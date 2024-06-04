pipeline {
    agent any

    environment {
        // Define your GitHub repository URL
        GITHUB_REPO_URL = 'https://github.com/RJAYTech/B2C.git'
        // Define your Docker Hub username
        DOCKER_HUB_USERNAME = 'rjayb2b'
        // Define your Docker Hub repository name
        DOCKER_HUB_REPOSITORY = 'frontend'
    }

    stages {
       

        stage('Change Directory and Install Dependencies') {
            steps {
                dir('ecommerce-multivendor-frontend-master') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('ecommerce-multivendor-frontend-master') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('ecommerce-multivendor-frontend-master') {
                    sh 'docker build -t b2bfrontend .'
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                dir('ecommerce-multivendor-frontend-master') {
                    sh "docker tag b2bfrontend ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPOSITORY}:latest"
                }
            }
        }

        stage('Push Frontend to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DockerCred', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        sh "docker push ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPOSITORY}:latest"
                    }
                }
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    sh "docker stop frontend_container || true"
                    sh "docker rm frontend_container || true"
                }
            }
        }

        stage('Pull and Run Container') {
            steps {
                script {
                    sh "docker pull ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPOSITORY}:latest"
                    sh "docker run -d -p 80:3000 --name frontend_container ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPOSITORY}:latest"
                }
            }
        }
    }

    post {
        success {
            emailext subject: "Build succeeded: ${currentBuild.fullDisplayName}",
                body: "The build ${currentBuild.fullDisplayName} succeeded. Please check the attached console output for more details.",
                to: "Vinai.k@rjaytechnologies.com",
                from: "kollurivinaichowdary@gmail.com",
                attachLog: true,
                attachmentsPattern: 'console.log'
        }
        failure {
            emailext subject: "Build failed: ${currentBuild.fullDisplayName}",
                body: "The build ${currentBuild.fullDisplayName} failed. Please check the attached console output for more details.",
                to: "Vinai.k@rjaytechnologies.com",
                from: "kollurivinaichowdary@gmail.com",
                attachLog: true,
                attachmentsPattern: 'console.log'
        }
    }
}
