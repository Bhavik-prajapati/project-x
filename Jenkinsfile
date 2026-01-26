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
      cat <<EOF > .env
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=userdb
PORT=3000
EOF

      docker-compose down
      docker-compose up -d --build
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
