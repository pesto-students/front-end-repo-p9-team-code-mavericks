#!/usr/local/bin/groovy

pipeline {
    agent any

      tools {nodejs "nodejs"}

    environment{
        DOCKER_IMAGE = "pestoFrontend"
    }

    stages {
        stage('Checkout') {
            steps {
                // Cleanup workspace cache before build
                cleanWs()
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/pesto-students/back-end-repo-p9-team-code-mavericks.git']]])
                }
            }
        }

       stage('Build') {
            steps {
                try{
                    sh 'docker stop rasoiFrontend'
                    sh 'docker rm rasoiFrontendc:\projects\express-demo\Dockerfile'
                }catch (Exception e){
                    echo 'Exception occurred: ' + e.toString()
                }
                // Build a Docker image for your Express application
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

      stage('Deploy') {
            steps {
                // Deploy the Docker container using the built image
                sh "docker run -d -p 3001:3001 --name rasoiFrontend $DOCKER_IMAGE"
            }
        }
    }
}
