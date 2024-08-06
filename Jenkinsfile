pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/karan9576/HostelHunt.git'
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    // Find the container ID or name of the running website container
                    def websiteContainer = "myserverapp-container" // Replace with your actual container name if different
                    
                    // Copy the built files to the website container
                    sh "docker cp . ${websiteContainer}:/app"
                    
                    // Restart the Node.js application in the container
                    sh "docker exec ${websiteContainer} pkill node"
                    sh "docker exec ${websiteContainer} nohup node /app/app.js &"
                }
            }
        }
    }
}
