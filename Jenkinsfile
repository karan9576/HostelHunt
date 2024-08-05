pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'karandevops/myserverapp'
        DOCKER_TAG = 'latest'
        DOCKER_CONTAINER_NAME = 'myserverapp-container'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/karan9576/HostelHunt'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}")
                }
            }
        }

        stage('Deploy to Container') {
            steps {
                script {
                    try {
                        sh "docker stop ${env.DOCKER_CONTAINER_NAME}"
                        sh "docker rm ${env.DOCKER_CONTAINER_NAME}"
                    } catch (Exception e) {
                        echo "Container not running"
                    }
                    sh "docker run -d --name ${env.DOCKER_CONTAINER_NAME} -p 8081:8081 ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"
                }
            }
        }
    }
}
