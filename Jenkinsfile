#!/usr/local/bin/groovy

pipeline {
    agent any

      tools {nodejs "nodejs"}

    environment{
        DOCKER_IMAGE = "pestofrontend"
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
                   script {
                       try{
                           sh 'docker stop rasoifrontend'
                           sh 'docker rm rasoifrontend'
                       }catch (Exception e){
                           echo 'Exception occurred: ' + e.toString()
                       }
                   }
                // Build a Docker image for your Express application
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

      stage('Deploy') {
            steps {
                // Deploy the Docker container using the built image
                sh "docker run -d -p 3000:3000 --name rasoifrontend $DOCKER_IMAGE"
            }
        }
    }
}