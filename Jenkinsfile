pipeline {
  agent any

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Test (Docker)') {
      steps {
        sh '''
          docker build -t project-x-test .
          docker run --rm project-x-test npm test
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker compose down
          docker compose up -d --build
        '''
      }
    }
  }

  post {
    success {
      echo '✅ CI/CD Pipeline Success'
    }
    failure {
      echo '❌ CI/CD Pipeline Failed'
    }
  }
}
